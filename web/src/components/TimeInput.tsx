// import { useEffect, useState } from "react";
import { useState } from "react";
import { numberToTime, timeToNumber } from "../timeConversion";

export interface TimeInputParams {
	value: number;
	onChange: (newValue: number) => void;
	onIsValidChange: (isValid: boolean) => void;
	disabled: boolean;
}

export function TimeInput(params: TimeInputParams) {
	const { value, onChange, onIsValidChange, disabled } = params;
	const [hoursValid, setHoursValid] = useState<boolean>(true);
	const [minutesValid, setMinutesValid] = useState<boolean>(true);
	const [secondsValid, setSecondsValid] = useState<boolean>(true);
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
						className={`time-input-segment${hoursValid ? "" : " invalid-time"}`}
						type="number"
						defaultValue={hours}
						// onChange={(e) => setHours(e.target.valueAsNumber)}
						// onChange={(e) => (hours = e.target.valueAsNumber)}
						onBlur={(e) => {
							const newValue = e.target.valueAsNumber;
							console.log("new hours:", newValue);
							if (
								newValue < 0 ||
								isNaN(newValue) ||
								e.target.value.indexOf(".") >= 0
							) {
								// Hours aren't valid after this change
								// If all the values were valid before this, notify parent that time is now invalid
								if (hoursValid && minutesValid && secondsValid) {
									onIsValidChange(false);
								}
								setHoursValid(false);
								return;
							}

							// Hours are valid after this change
							// If hours weren't valid before but minutes and seconds were, notify parent that time is now valid
							if (!hoursValid && minutesValid && secondsValid) {
								onIsValidChange(true);
							}
							setHoursValid(true);
							if (minutesValid && secondsValid) {
								onChange(
									timeToNumber({
										hours: newValue,
										minutes,
										seconds,
										milliseconds: 0,
									}),
								);
							}
						}}
						disabled={disabled}
					/>
					<div className="colon">:</div>
					<input
						className={`time-input-segment${minutesValid ? "" : " invalid-time"}`}
						type="number"
						defaultValue={minutes}
						onBlur={(e) => {
							const newValue = e.target.valueAsNumber;
							if (
								newValue < 0 ||
								newValue > 59 ||
								isNaN(newValue) ||
								e.target.value.indexOf(".") >= 0
							) {
								// Minutes aren't valid after this change
								// If all the values were valid before this, notify parent that time is now invalid
								if (hoursValid && minutesValid && secondsValid) {
									onIsValidChange(false);
								}
								setMinutesValid(false);
								return;
							}

							// Minutes are valid after this change
							// If minutes weren't valid before but hours and seconds were, notify parent that time is now valid
							if (!minutesValid && hoursValid && secondsValid) {
								onIsValidChange(true);
							}
							setMinutesValid(true);
							if (hoursValid && secondsValid) {
								onChange(
									timeToNumber({
										hours,
										minutes: newValue,
										seconds,
										milliseconds: 0,
									}),
								);
							}
						}}
						disabled={disabled}
					/>
					<div className="colon">:</div>
					<input
						className={`time-input-segment${secondsValid ? "" : " invalid-time"}`}
						type="number"
						defaultValue={seconds}
						onBlur={(e) => {
							const newValue = e.target.valueAsNumber;
							if (
								newValue < 0 ||
								newValue > 59 ||
								isNaN(newValue) ||
								e.target.value.indexOf(".") >= 0
							) {
								// Seconds aren't valid after this change
								// If all the values were valid before this, notify parent that time is now invalid
								if (hoursValid && minutesValid && secondsValid) {
									onIsValidChange(false);
								}
								setSecondsValid(false);
								return;
							}

							// Seconds are valid after this change
							// If seconds weren't valid before but hours and minutes were, notify parent that time is now valid
							if (!secondsValid && hoursValid && minutesValid) {
								onIsValidChange(true);
							}
							setSecondsValid(true);
							if (hoursValid && minutesValid) {
								onChange(
									timeToNumber({
										hours,
										minutes,
										seconds: newValue,
										milliseconds: 0,
									}),
								);
							}
						}}
						disabled={disabled}
					/>
				</div>
			</div>
		</>
	);
}
