import { GameTime, numberToTime, timeToNumber } from "../../web/src/timeConversion";

test("600 to time", () => {
	const gameTime: GameTime = { hours: 0, minutes: 10, seconds: 0, milliseconds: 0 };
	expect(numberToTime(600)).toEqual(gameTime);
});

test("time to 600", () => {
	const gameTime: GameTime = { hours: 0, minutes: 10, seconds: 0, milliseconds: 0 };
	expect(timeToNumber(gameTime)).toEqual(600);
});

test("3661 to time", () => {
	const gameTime: GameTime = { hours: 1, minutes: 1, seconds: 1, milliseconds: 0 };
	expect(numberToTime(3661)).toEqual(gameTime);
});

test("time to 3661", () => {
	const gameTime: GameTime = { hours: 1, minutes: 1, seconds: 1, milliseconds: 0 };
	expect(timeToNumber(gameTime)).toEqual(3661);
});

test("3661.001 to time", () => {
	const gameTime: GameTime = { hours: 1, minutes: 1, seconds: 1, milliseconds: 1 };
	expect(numberToTime(3661.001)).toEqual(gameTime);
});

test("time to 3661.001", () => {
	const gameTime: GameTime = { hours: 1, minutes: 1, seconds: 1, milliseconds: 1 };
	expect(timeToNumber(gameTime)).toEqual(3661.001);
});
