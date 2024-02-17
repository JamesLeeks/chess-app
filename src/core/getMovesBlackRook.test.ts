import { getMoveOptions } from "./getMoveOptions";
import { parseBoard } from "./board";
import { Position } from "./models";
import { position, positions } from "./position";

test("black rook forward moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BR BN -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a2", "a3", "a4", "a5", "a6", "a7", "a8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook forward blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BR BN -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a2", "a3", "a4", "a5", "a6");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook forward capture", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- --
	WN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BR BN -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a1"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a2", "a3", "a4", "a5", "a6", "a7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook backward moves", () => {
	const initialBoard = parseBoard(`
	BR BN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a1", "a2", "a3", "a4", "a5", "a6", "a7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook backward blocked", () => {
	const initialBoard = parseBoard(`
	BR BN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a6", "a7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook backward capture", () => {
	const initialBoard = parseBoard(`
	BR BN -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	WN -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a1", "a2", "a3", "a4", "a5", "a6", "a7");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook right moves", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- -- -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b8", "c8", "d8", "e8", "f8", "g8", "h8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook right blocked", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- BN -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b8", "c8", "d8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook right capture", () => {
	const initialBoard = parseBoard(`
	BR -- -- -- WN -- -- --
	BN -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("a8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("b8", "c8", "d8", "e8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook left moves", () => {
	const initialBoard = parseBoard(`
	-- -- -- -- -- -- -- BR
	-- -- -- -- -- -- -- BN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("h8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("a8", "b8", "c8", "d8", "e8", "f8", "g8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook left blocked", () => {
	const initialBoard = parseBoard(`
	-- -- -- BN -- -- -- BR
	-- -- -- -- -- -- -- BN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("h8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("e8", "f8", "g8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});

test("black rook left capture", () => {
	const initialBoard = parseBoard(`
	-- -- -- WN -- -- -- BR
	-- -- -- -- -- -- -- BN
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
    -- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	-- -- -- -- -- -- -- --
	`);
	const moveOptions = getMoveOptions(position("h8"), initialBoard);
	const expectedMoveOptions: Position[] = positions("d8", "e8", "f8", "g8");
	expect(moveOptions).toIncludeSameMembers(expectedMoveOptions);
});