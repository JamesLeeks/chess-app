import { Get, Path, Route, Security, Request, Post, Controller, Body, Put } from "tsoa";
import * as express from "express";
import { ensureUserId } from "../../authentication";
import { NotFoundError } from "../../errorMiddleware";
import { userService } from "../services/UserService";
import { Account, AccountCreate } from "../../../common/src/models";

@Route("account")
export class UserController extends Controller {
	@Security("AADB2C")
	@Get("")
	public async getAccount(
		@Request()
		req: express.Request
	): Promise<Account> {
		const userId = ensureUserId(req);
		// console.log("from AccountController.ts line 17 ", { msg: "temp", user: req.user });
		// console.log("USER ID ##################", userId);
		const response = await userService.get(userId);
		if (!response) {
			// console.log("line 19 account controller not found error");
			console.log(response);
			throw new NotFoundError();
		}

		return { username: response.username, email: response.email };
	}

	// @Security("AADB2C") // TODO: ADD THIS BACK
	// @Post()
	// public async addUser(
	// 	@Request()
	// 	req: express.Request,
	// 	@Body()
	// 	account: AccountCreate
	// ): Promise<{ id: string }> {
	// 	const userId = ensureUserId(req);

	// 	const game = await userService.create(userId, account.username, account.email);
	// 	return {
	// 		id: game.id,
	// 	};
	// }

	@Security("AADB2C")
	@Post()
	public async updateUser(
		@Request()
		req: express.Request,
		@Body()
		account: AccountCreate
	): Promise<{ id: string }> {
		const userId = ensureUserId(req);

		const response = await userService.get(userId);
		if (!response) {
			console.log(response);
			throw new NotFoundError();
		}

		const game = await userService.update(userId, account.username, account.email, response.email);
		return {
			id: game.id,
		};
	}

	@Security("AADB2C")
	@Post("/confirm/{token}")
	public async confirmEmail(
		@Request()
		req: express.Request,
		@Path()
		token: string
	) {
		const userId = ensureUserId(req);

		console.log(`controller - ${token}`);

		const foo = await userService.confirmEmail(userId, token);
		// call UserService.confirmEmail
		// for more info see https://github.com/JamesLeeks/chess-app/issues/15
	}
}
// TODO: CHANGE THE FUNCTION CALLED WHEN EDITING PROFILE FROM CREATE USER TO UPDATE USER (DIFFERENT FILE FROM CREATEUSER.TSX?)
