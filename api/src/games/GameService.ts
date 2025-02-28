import { DefaultAzureCredential, TokenCredential } from "@azure/identity";
import { Game, SerializedGame } from "../../../common/src/game";
import { Position, PromotionType } from "../../../common/src/models";
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

	public async create(ownerId: string, startingTime: number): Promise<Game> {
		const container = await this.getContainer();

		const game = new Game({ ownerId, startingTime: startingTime });

		await container.items.create(game.toJsonObject());

		return game;
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
