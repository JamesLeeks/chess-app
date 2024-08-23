export type ClockProps = {
	time: number;
};

export function ClockComponent(props: ClockProps) {
	const { time } = props;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	// CONVERT TIME
	hours = Math.floor(time / 3600);
	minutes = Math.floor(time / 60) % 60;
	seconds = Math.floor(time % 60);
	// if (time >= 3600) {
	// 	hours = Math.floor(time / 60);
	// 	minutes = time % 60;
	// 	seconds = time % 60;
	// } else {
	// 	// divide by 60
	// 	// const minutes = (time - (time % 60)) / 60;
	// 	minutes = Math.floor(time / 60);
	// 	// use remainder as seconds
	// 	seconds = time % 60;
	// 	// arange like this: minutes:seconds
	// }
	// TODO: when time low show milliseconds
	return (
		<div className="clock">
			{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
			{String(seconds).padStart(2, "0")}
		</div>
	);
}
