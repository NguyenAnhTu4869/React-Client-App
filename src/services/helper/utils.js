export const getTimeDuration = (date1, date2) => {
	let duration = Math.abs(date1 - date2);
	const hours = Math.floor(duration / 3600000);
	duration -= hours * 3600000;
	const minutes = Math.floor(duration / 60000);
	duration -= minutes * 60000;
	const seconds = Math.floor(duration / 1000);
	const days = hours > 24 ? hours / 24 : 0;
	return { hours, minutes, seconds, days };
};
