import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		autobop: true,
		volume: 1,
	},
	migrations: [
		OptionsSync.migrations.removeUnused
	],
	logging: true
});
