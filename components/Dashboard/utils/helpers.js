export const usNavyMethod = (abdomen, neck, height) =>
	(495 / (1.0324 - 0.19077 * Math.log10(abdomen - neck) + 0.15456 * Math.log10(height * 100)) - 450);
export const baileyMethod = (abdomen, hips, forearm, wrist) =>
	(abdomen / 2.54 + hips / 2.54 * 0.5 - 2.7 * (forearm / 2.54) - wrist / 2.54) ;

export const getFatPercentAvg = (abdomen, hips, forearm, wrist, neck, height) =>
	((usNavyMethod(abdomen, neck, height) + baileyMethod(abdomen, hips, forearm, wrist)) / 2).toFixed(0);
