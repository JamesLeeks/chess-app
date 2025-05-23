import { Container, CosmosClient, ItemResponse } from "@azure/cosmos";
import { TokenCredential, DefaultAzureCredential } from "@azure/identity";
import { Game, SerializedGame } from "../../../common/src/game";
import { User } from "../../../common/src/models";
import { stringify } from "querystring";
import { FieldErrors, ValidateError } from "tsoa";

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

		return { id: response.resource.id, username: response.resource.username, type: "user" };
	}

	public async create(userId: string, username: string): Promise<User> {
		const container = await this.getContainer();

		console.log("create user", { userId, username });
		const user: User = { id: userId, username: username, type: "user" };

		try {
			// await container.items.create(user);
			await container.items.upsert(user);
			return user;
		} catch (error) {
			const errorWithCode = error as { code?: number };
			if (errorWithCode.code === 409) {
				console.log("WARRRRR");
				// TODO: revisit where we throw this error
				// if we get to this point we know it's the username that's not unique because if it's the id the upsert will just update the item
				const fieldErrors: FieldErrors = {
					name: { message: `Chosen username already in use` },
				};
				throw new ValidateError(fieldErrors, "");
			}
			throw error;
		}
	}
}

export const userService = new UserService();
