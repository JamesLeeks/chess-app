import * as express from "express";

export class NotFoundError extends Error {}

export function RegisterErrorMiddleware(app: express.Application) {
	app.use(function errorHandler(
		err: unknown,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (err instanceof UnauthorizedError) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		if (err instanceof NotFoundError) {
			return res.status(404).json({
				message: "Not Found",
			});
		}

		next();
	});
}

export class UnauthorizedError extends Error {}
