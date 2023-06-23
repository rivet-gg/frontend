module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'unused-imports', 'prefer-let'],
	root: true,
	rules: {
		'prefer-let/prefer-let': 'error',
		'prefer-const': 'off',

		// Disallow unused imports so `eslint:fix` will remove the unused imports.
		//
		// See https://github.com/sweepline/eslint-plugin-unused-imports#usage
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_'
			}
		]
	}
};
