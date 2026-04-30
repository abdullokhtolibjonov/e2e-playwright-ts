import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'playwright/.auth/**'],
  },
);
