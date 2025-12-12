// import { useEffect, useState } from "react";
import { numberToTime, timeToNumber } from "../timeConversion";

export interface TimeInputParams {
	value: number;
	onChange: (newValue: number) => void;
	disabled: boolean;
}

export function TimeInput(params: TimeInputParams) {
	const { value, onChange, disabled } = params;
	const inputTime = numberToTime(value);
	// const [hours, setHours] = useState<number>(inputTime.hours);
	// const [minutes, setMinutes] = useState<number>(inputTime.minutes);
	// const [seconds, setSeconds] = useState<number>(inputTime.seconds);

	// console.log(
	// 	`${inputTime.hours}:${inputTime.minutes}:${inputTime.seconds}.....${hours}:${minutes}:${seconds}`
	// );

	// useEffect(() => {
	// 	setHours(inputTime.hours);
	// 	setMinutes(inputTime.minutes);
	// 	setSeconds(inputTime.seconds);
	// }, [inputTime]);

	const hours = inputTime.hours;
	const minutes = inputTime.minutes;
	const seconds = inputTime.seconds;

	return (
		<>
			<div className="time-input-container">
				<div className="time-input-box">
					<input
						className="time-input-segment"
						type="number"
						value={hours}
						// onChange={(e) => setHours(e.target.valueAsNumber)}
						// onChange={(e) => (hours = e.target.valueAsNumber)}
						onChange={(e) => {
							const newValue = e.target.valueAsNumber;
							if (e.target.value.indexOf(".") >= 0) {
								// only want whole numbers!
								e.preventDefault();
								return;
							}
							if (newValue < 0 || isNaN(newValue)) {
								e.preventDefault();
								return;
							}
							onChange(
								timeToNumber({
									hours: e.target.valueAsNumber,
									minutes,
									seconds,
									milliseconds: 0,
								})
							);
						}}
						disabled={disabled}
					/>
					<div className="colon">:</div>
					<input
						className="time-input-segment"
						type="number"
						value={minutes}
						onChange={(e) => {
							if (e.target.value.indexOf(".") >= 0) {
								// only want whole numbers!
								e.preventDefault();
								return;
							}
							const newValue = e.target.valueAsNumber;
							if (newValue < 0 || newValue > 59 || isNaN(newValue)) {
								e.preventDefault();
								return;
							}
							onChange(
								timeToNumber({
									hours,
									minutes: newValue,
									seconds,
									milliseconds: 0,
								})
							);
						}}
						disabled={disabled}
					/>
					<div className="colon">:</div>
					<input
						className="time-input-segment"
						type="number"
						value={seconds}
						onChange={(e) => {
							const newValue = e.target.valueAsNumber;
							if (e.target.value.indexOf(".") >= 0) {
								// only want whole numbers!
								e.preventDefault();
								return;
							}
							if (newValue < 0 || newValue > 59 || isNaN(newValue)) {
								e.preventDefault();
								return;
							}
							onChange(
								timeToNumber({
									hours,
									minutes,
									seconds: newValue,
									milliseconds: 0,
								})
							);
						}}
						disabled={disabled}
					/>
				</div>
			</div>
		</>
	);
}
