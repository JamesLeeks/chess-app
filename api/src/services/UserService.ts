import { Container, CosmosClient, ItemResponse } from "@azure/cosmos";
import { TokenCredential, DefaultAzureCredential } from "@azure/identity";
import { Game, SerializedGame } from "../../../common/src/game";
import { User, UserEmailRequest } from "../../../common/src/models";
import { stringify } from "querystring";
import { FieldErrors, ValidateError } from "tsoa";
import { nanoid } from "nanoid";
import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export class UserService {
	private container: Container | null = null;

	public async getContainer(): Promise<Container> {
		if (this.container) {
			return this.container;
		}

		const url = process.env.COSMOS_URL;

		if (!url) {
			throw new Error("COSMOS_URL should be set");
		}

		console.log(`Connecting to cosmos. URL: ${url}`);

		const credential: TokenCredential = new DefaultAzureCredential();
		const client = new CosmosClient({ endpoint: url, aadCredentials: credential });

		const { database } = await client.databases.createIfNotExists({ id: "chess-app" });
		const { container } = await database.containers.createIfNotExists({
			id: "users",
			partitionKey: "/type",
			uniqueKeyPolicy: {
				uniqueKeys: [
					{
						paths: ["/username"],
					},
				],
			},
		});

		this.container = container;

		return container;
	}

	public async get(id: string): Promise<User | undefined> {
		const container = await this.getContainer();
		const partitionKey = id;

		const response: ItemResponse<User> = await container.item(id, "user").read<User>();

		if (!response.resource) {
			// console.log("from UserService.ts get function: response.resource doesn't exist");
			// console.log(response.resource);
			return undefined;
		}

		return {
			id: response.resource.id,
			username: response.resource.username,
			email: response.resource.email,
			type: "user",
		};
	}

	// initial creation function
	public async create(userId: string, username: string, email: string): Promise<User> {
		const container = await this.getContainer();

		console.log("create user", { userId, username });
		const user: User = { id: userId, username: username, type: "user", email: email };

		try {
			await container.items.create(user);
			return user;
		} catch (error) {
			const errorWithCode = error as { code?: number };
			if (errorWithCode.code === 409) {
				const fieldErrors: FieldErrors = {
					name: { message: `Chosen username already in use` },
				};
				throw new ValidateError(fieldErrors, "");
			}
			throw error;
		}
	}

	// function to update username and email (email still to be confirmed at this point)
	public async update(
		userId: string,
		username: string,
		enteredEmail: string,
		email?: string
	): Promise<UserEmailRequest | User> {
		const container = await this.getContainer();

		const token = nanoid();

		if (enteredEmail !== email) {
			console.log(`localhost:5173/account/confirm/?token=${token}`);

			if (!process.env.API_KEY) {
				throw new Error("should have api key");
			}

			// send email
			const mailerSend = new MailerSend({
				apiKey: process.env.API_KEY,
			});

			const sentFrom = new Sender("email@chess.james.leeks.net", "Chess App");
			const recipients = [new Recipient(enteredEmail, "Your Client")];
			const emailParams = new EmailParams()
				.setFrom(sentFrom)
				.setTo(recipients)
				.setReplyTo(sentFrom)
				.setSubject("Email confirmation")
				.setHtml(
					`<div style="display: flex; justify-content: center; align-items: center; flex-direction: column; grid-area: content;"> <div>The account ${username} has made a request to change their notifications email adress. If this is not you, you may safely ignore this email.</div> <div>Click here to confirm your email adress:</div> <a style="background-color: green; padding: 0.3vw; text-decoration: none; font-weight: bold; border-color: green; border-radius: 0.5vw; border-width: 0.1vw; border-style: solid; color: white;" href="http://localhost:5173/account/confirm/?token=${token}">confirm</a> <div style="color: red; font-style: italic;">IMPORTANT: this will not change the email address used for your login, only where we send notifications if you have opted into them.</div> </div>`
				)
				.setText(
					`The account ${username} has made a request to change their notifications email adress. If this is not you, you may safely ignore this email. \nClick here to confirm your email adress: http://localhost:5173/account/confirm/?token=${token} \nIMPORTANT: this will not change the email address used for your login, only where we send notifications if you have opted into them.`
				);

			const response = await mailerSend.email.send(emailParams);
			if (response.statusCode < 200 && response.statusCode >= 300) {
				const fieldErrors: FieldErrors = {
					name: { message: `Could not send email` }, // TODO: fix this message
				};
				throw new ValidateError(fieldErrors, "");
			}
		}

		const user: UserEmailRequest | User = {
			id: userId,
			username: username,
			email: email,
			type: "user",
			emailRequest: enteredEmail !== email ? { email: enteredEmail, token: token } : undefined,
		};

		try {
			await container.items.upsert(user);
			return user;
		} catch (error) {
			const errorWithCode = error as { code?: number };
			if (errorWithCode.code === 409) {
				const fieldErrors: FieldErrors = {
					// if we get to this point we know it's the username that's not unique because if it's the id the upsert will just update the item
					name: { message: `Chosen username already in use` },
				};
				throw new ValidateError(fieldErrors, "");
			}
			throw error;
		}
	}

	public async confirmEmail(userId: string, token: string) {
		// get user by id
		const container = await this.getContainer();
		const partitionKey = userId;

		const response: ItemResponse<UserEmailRequest> = await container.item(userId, "user").read<UserEmailRequest>();

		if (!response.resource) {
			throw new Error("couldn't get user");
		}

		if (!response.resource.emailRequest) {
			const fieldErrors: FieldErrors = {
				name: { message: `Token not valid` },
			};
			throw new ValidateError(fieldErrors, "");
		}

		// if the token on the user matches the one passed in:
		if (response.resource.emailRequest.token === token) {
			// update user: change email and remove emailRequest block
			const user: User = {
				id: userId,
				username: response.resource.username,
				email: response.resource.emailRequest.email,
				type: "user",
			};

			try {
				await container.items.upsert(user);
				return user;
			} catch (error) {
				const errorWithCode = error as { code?: number };
				if (errorWithCode.code === 409) {
					const fieldErrors: FieldErrors = {
						// if we get to this point we know it's the username or the email that's not unique because if it's the id the upsert will just update the item
						name: { message: `Chosen username/email already in use` },
					};
					throw new ValidateError(fieldErrors, "");
				}
				throw error;
			}
		} else {
			console.log("Token didn't match");
		}
	}
}

export const userService = new UserService();
