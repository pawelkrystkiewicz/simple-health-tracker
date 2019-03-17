export const myBlue = '#2677BD';
export const myBlack = '#222222';
export const greyBlack = '#282828';
export const outerSpace = '#4A4A4A';
export const myWhite = '#ffffff';
export const myGreen = '#2ecc71';
export const myOrange = '#e67e22';
export const myPurple = '#D27AFF';

export const h2677BD = '#2677BD';
export const h0A1128 = '#0A1128';
export const h001F54 = '#001F54';
export const h104F55 = '#104F55';
export const h073B3A = '#073B3A';

export const headerBackground = '#000000';

export const uniqueColors = {
	a: '#2677BD',
	b: '#0A1128',
	c: '#001F54',
	d: '#104F55',
	e: '#073B3A'
};

export const getUniqueColor = (i) => {
	let color = '';

	if (i % 2 === 0) {
		return (color = uniqueColors.a);
	}
	if (i % 3 === 0) {
		return (color = uniqueColors.b);
	}
	if (i % 5 === 0) {
		return (color = uniqueColors.c);
	}
	if (i % 7 === 0) {
		return (color = uniqueColors.d);
	} else {
		return (color = uniqueColors.e);
	}
};

// module.exports = { uniqueColors, getUniqueColor };
