import { Get, Path, Route, Security, Request, Post, Controller, Body } from "tsoa";
import * as express from "express";
import { ensureUserId } from "../../authentication";
import { NotFoundError } from "../../errorMiddleware";
import { userService } from "../services/UserService";
import { Account } from "../../../common/src/models";

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

		return { username: response.username };
	}

	@Security("AADB2C")
	@Post()
	public async addGame(
		@Request()
		req: express.Request,
		@Body()
		account: Account
	): Promise<{ id: string }> {
		const userId = ensureUserId(req);

		const game = await userService.create(userId, account.username);
		return {
			id: game.id,
		};
	}
}
