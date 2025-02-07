module.exports = {
	// transform: {
	//     '^.+\\.(ts|tsx)$': 'ts-jest',
	// },
	setupFilesAfterEnv: ["./setupTests.ts"],
	typeAcquisition: {
		include: ["jest"],
	},
};
