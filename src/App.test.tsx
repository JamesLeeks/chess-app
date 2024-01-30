import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { PieceColour } from "./core/models";

test("renders learn react link", () => {
	render(<App />);
	const linkElement = screen.getByText(/Chess App/i);
	expect(linkElement).toBeInTheDocument();
});

test("wibble", () => {
	const col: PieceColour = "black";
	expect(col).toBe("black");
});
