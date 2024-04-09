import { boardToString } from "./board";

test("empty board", () => {
	const board = boardToString([
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
		Array(8).fill(undefined),
	]);

	expect(board).toEqual(
		`
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
-- -- -- -- -- -- -- --
`.trimStart()
	);
});
