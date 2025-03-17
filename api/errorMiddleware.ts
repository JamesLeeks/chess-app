import * as express from "express";

export class BadRequestError extends Error {}
export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}

export function RegisterErrorMiddleware(app: express.Application) {
	app.use(function errorHandler(
		err: unknown,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (err instanceof BadRequestError) {
			return res.status(400).json({
				message: err.message,
			});
		}
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
		if (err) {
			console.log("Unhandled error", err);
			return res.status(500).json({
				message: "Error occurred",
			});
		}

		next();
	});
}
