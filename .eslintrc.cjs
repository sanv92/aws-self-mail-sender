/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
	root: true,
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json',
				sourceType: 'module',
			},
			extends: [
				'@remix-run/eslint-config',
				'@remix-run/eslint-config/node',
				'prettier',
			],
			rules: {
				'react-hooks/exhaustive-deps': 'off',
			},
		},
		{
			files: ['**/*.js'],
			extends: ['eslint:recommended', 'prettier'],
			rules: {
				// JavaScript-specific rules
			},
		},
	],
	ignorePatterns: [
		'vite.config.ts',
		'index.d.ts',
		'lib/env/**/*.js',
	],
};
