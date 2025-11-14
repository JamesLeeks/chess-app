import { numberToTime } from "../timeConversion";

export type ClockProps = {
	time: number;
	isActive: boolean;
};

export function ClockComponent(props: ClockProps) {
	const { time, isActive } = props;
	const gameTime = numberToTime(time);

	const classString = isActive ? "clock-active" : "";
	if (time > 30) {
		return (
			<div className="clock">
				<div className={classString}>
					{String(gameTime.hours).padStart(2, "0")}:
					{String(gameTime.minutes).padStart(2, "0")}:
					{String(gameTime.seconds).padStart(2, "0")}
				</div>
			</div>
		);
	}
	return (
		<div className="clock">
			<div className={classString}>
				{String(gameTime.minutes).padStart(2, "0")}:
				{String(gameTime.seconds).padStart(2, "0")}.
				{String(gameTime.milliseconds).padStart(2, "0")}
			</div>
		</div>
	);
}
