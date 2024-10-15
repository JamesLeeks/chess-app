export type ClockProps = {
	time: number;
	isActive: boolean;
};

export function ClockComponent(props: ClockProps) {
	const { time, isActive } = props;

	// CONVERT TIME
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor(time / 60) % 60;
	const seconds = Math.floor(time % 60);
	const milliseconds = Math.round((time - Math.floor(time)) * 100);
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
	const classString = isActive ? "clock active" : "clock";
	if (time > 30) {
		return (
			<div className={classString}>
				{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
				{String(seconds).padStart(2, "0")}
			</div>
		);
	}
	return (
		<div className={classString}>
			{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}.
			{String(milliseconds).padStart(2, "0")}
		</div>
	);
}
