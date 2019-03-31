import { createMuiTheme } from '@material-ui/core/styles';
export const defaultIcon = (text, color) =>
	`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path style="fill:${color};" id="b" d="M33.477 27.454c0-7.296-6.045-13.232-13.477-13.232S6.523 20.158 6.523 27.454c0 3.349 1.273 6.41 3.37 8.744l10.089 9.962 10.126-9.962c2.096-2.333 3.369-5.395 3.369-8.744z"/><path id="a" d="M33.477 27.454c0-7.296-6.045-13.232-13.477-13.232S6.523 20.158 6.523 27.454c0 3.349 1.273 6.41 3.37 8.744l10.089 9.962 10.145-9.962c2.077-2.333 3.35-5.395 3.35-8.744z"/><mask id="c" width="26.953" height="31.938" x="0" y="0" fill="#fff"><use xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><ellipse cx="20" cy="45.16" fill="#FFF" stroke="#979797" stroke-width=".25" rx="3.5" ry="3.5"/><use fill="#01B6B2" xlink:href="#b"/><use stroke="#FFF" stroke-width=".5" mask="url(#c)" xlink:href="#a"/><text fill="#FFF" font-family="FiraSansRegular,Lucida Sans Unicode,sans-serif" font-size="15.36" font-weight="400"><tspan x="15" y="33.182">${text}</tspan></text></g></svg>`;
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

export const theme = (type = 'light') =>
	createMuiTheme({
		palette: {
			type,
			// primary: {
			// 	// light: will be calculated from palette.primary.main,
			// 	main: '#ff4400',
			// 	// dark: will be calculated from palette.primary.main,
			// 	// contrastText: will be calculated to contrast with palette.primary.main
			// },
			// secondary: {
			// 	light: '#0066ff',
			// 	main: '#0044ff',
			// 	// dark: will be calculated from palette.secondary.main,
			// 	contrastText: '#ffcc00',
			// },
		},
		typography: {
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"'
			].join(','),
			useNextVariants: true
		}
	});
