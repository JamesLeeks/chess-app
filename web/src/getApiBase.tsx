export function getApiBase() {
	return window.location.hostname == "localhost"
		? "http://localhost:3000"
		: "https://chess-api.james.leeks.net";
}
