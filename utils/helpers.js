export const timeDiff = (startDTime, endDtime) => {
	const startTime = new Date(startDTime);
	const endTime = new Date(endDtime);
	const diff = endTime.getTime() - startTime.getTime();
	let msec = diff;
	const minutes = Math.floor(msec / 1000 / 60);
	msec -= minutes * 1000 * 60;
	const ss = Math.floor(msec / 1000);
	msec -= ss * 1000;
	return minutes;
};

export const makeArrayUnique = (array, key) =>
	array.reduce((prev, curr) => (prev.find((a) => a[key] === curr[key]) ? prev : prev.push(curr) && prev), []);

export const partitionArray = (data, finalSize) => {
	let outcome = [];
	data.forEach((item) => {
		if (!outcome.length || outcome[outcome.length - 1].length === finalSize) outcome.push([]);

		outcome[outcome.length - 1].push(item);
	});
	return outcome;
};

export const timeConversion = (minutes) => {
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	if (minutes < 60) {
		return `${minutes} min`;
	} else if (hours < 24) {
		return `${hours}h ${minutes % 60} min`;
	} else {
		return `${days}d ${hours % 24}h ${minutes % 60} min`;
	}
};

export const sumArrayByProperty = (property, array) => array.reduce((a, b) => a + (b[property] || 0), 0);
export const sumArray = (array = [ 0, 0 ]) => array.reduce((a, b) => a + b, 0);
export const has = (object, key) => {
	return object ? hasOwnProperty.call(object, key) : false;
};
