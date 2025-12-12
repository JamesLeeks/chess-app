export type GameTime = {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
};

export function numberToTime(time: number): GameTime {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor(time / 60) % 60;
	const seconds = Math.floor(time % 60);
	const milliseconds = Math.round((time - Math.floor(time)) * 1000);
	return { hours, minutes, seconds, milliseconds };
}

export function timeToNumber(gameTime: GameTime): number {
	console.log("time conversion temp output", gameTime);
	return gameTime.hours * 3600 + gameTime.minutes * 60 + gameTime.seconds + gameTime.milliseconds / 1000;
}
