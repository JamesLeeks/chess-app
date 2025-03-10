import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { Game, SerializedGame } from "../../../common/src/game";
import { PieceColour, Position, PromotionType } from "../../../common/src/models";
import { Container, CosmosClient, ItemResponse } from "@azure/cosmos";

export class GameService {
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
		const { container } = await database.containers.createIfNotExists({ id: "games" });

		this.container = container;

		return container;
	}

	public async create(ownerId: string, startingTime: number, ownerSide: PieceColour): Promise<Game> {
		const container = await this.getContainer();

		const game = new Game({ ownerId, whiteTime: startingTime, blackTime: startingTime, ownerSide });

		await container.items.create(game.toJsonObject());

		return game;
	}

	public async addPlayer(gameId: string, playerId: string): Promise<Game> {
		const container = await this.getContainer();

		// const game = new Game({ ownerId, whiteTime: startingTime, blackTime: startingTime, ownerSide });
		const response = await this.get(gameId);

		if (!response) {
			throw new Error("404 not found");
		}

		// TODO: only do this if player id is not set

		const game = new Game({
			blackTime: response.game.blackTime,
			whiteTime: response.game.whiteTime,
			board: response.game.board,
			currentTurn: response.game.currentTurn,
			history: response.game.history,
			id: response.game.id,
			ownerId: response.game.ownerId,
			ownerSide: response.game.ownerSide,
			playerId: playerId,
		});

		console.log("gammee id", game.playerId);

		await container.items.upsert(game.toJsonObject(), {
			accessCondition: {
				type: "IfMatch",
				condition: response.etag,
			},
		});

		return response.game;
	}

	public async get(id: string): Promise<{ game: Game; etag: string } | undefined> {
		const container = await this.getContainer();
		const partitionKey = id;

		const response: ItemResponse<SerializedGame> = await container.item(id, partitionKey).read<SerializedGame>();

		if (!response.resource) {
			return undefined;
		}

		return {
			game: Game.fromJsonObject(response.resource),
			etag: response.etag,
		};
	}

	public async makeMove(
		game: Game,
		etag: string,
		from: Position,
		to: Position,
		promotionType?: PromotionType
	): Promise<Game | undefined> {
		const container = await this.getContainer();

		const newGame = game.makeMove(from, to, promotionType);

		await container.items.upsert(newGame.toJsonObject(), {
			accessCondition: {
				type: "IfMatch",
				condition: etag,
			},
		});

		return newGame;
	}
}

export const gameService = new GameService();
