import * as express from "express";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest, VerifiedCallback } from "passport-jwt";
import jwksRsa from "jwks-rsa";
import { UnauthorizedError } from "./errorMiddleware";

let initialized = false;

// This function is called when the token is verified
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verifyCallBack(token: any, done: VerifiedCallback) {
	// Convert the token to the User object
	const user = {
		id: token.oid,
		email: token.emails[0],
		name: token.name,
		token: token,
	};
	return done(null, user);
}

export function registerStrategies() {
	if (initialized) {
		return;
	}

	const tenantName = process.env.TENANT_NAME;
	if (!tenantName) {
		throw new Error("TENANT_NAME not set");
	}
	const tenantId = process.env.TENANT_ID;
	if (!tenantId) {
		throw new Error("TENANT_ID not set");
	}
	const clientID = process.env.CLIENT_ID;
	if (!clientID) {
		throw new Error("CLIENT_ID not set");
	}
	const policyName = process.env.POLICY_NAME;
	if (!policyName) {
		throw new Error("POLICY_NAME not set");
	}

	// This is the URL where the public keys for the tenant are stored.
	const jwksUri = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/discovery/v2.0/keys`;

	// This issuer and audience are used for API scope with MSAL
	const issuer1 = `https://${tenantName}.b2clogin.com/${tenantId}/v2.0/`;
	const audience1 = clientID;

	function wrapper(req: any) {
		const value = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		return value;
	}
	const options: StrategyOptionsWithoutRequest = {
		// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		jwtFromRequest: wrapper,
		audience: [audience1],
		issuer: [issuer1],
		algorithms: ["RS256"],
		secretOrKeyProvider: jwksRsa.passportJwtSecret({
			cache: true,
			rateLimit: true,
			jwksRequestsPerMinute: 5,
			jwksUri: jwksUri,
		}),
	};
	const bearerStrategy = new Strategy(options, verifyCallBack);

	passport.use("AADB2C", bearerStrategy);
	initialized = true;
}

export async function expressAuthentication(
	request: express.Request,
	securityName: string,
	scopes?: string[] // eslint-disable-line @typescript-eslint/no-unused-vars
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
	registerStrategies();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const strategy: any = passport.authenticate(securityName, {
		session: false,
	});

	const authResult = await new Promise((resolve, reject) =>
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		strategy(request, request.res, (err: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(request.user);
			}
		})
	);
	return authResult;
}

export function getUserIdFromRequest(req: express.Request): string {
	const user = req.user as any; // eslint-disable-line @typescript-eslint/no-explicit-any
	const userId = user?.id;
	return userId;
}
export function ensureUserId(req: express.Request): string {
	const userId = getUserIdFromRequest(req);
	if (!userId) {
		throw new UnauthorizedError();
	}
	return userId;
}
export function getUserEmailFromRequest(req: express.Request): string {
	const user = req.user as any; // eslint-disable-line @typescript-eslint/no-explicit-any
	const userEmail = user?.email;
	return userEmail;
}
export function ensureUserEmail(req: express.Request): string {
	const userEmail = getUserEmailFromRequest(req);
	if (!userEmail) {
		throw new UnauthorizedError();
	}
	return userEmail;
}
