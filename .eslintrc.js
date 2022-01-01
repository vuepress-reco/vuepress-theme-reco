module.exports = {
  root: true,
  extends: 'vuepress',
  globals: {
    __VUEPRESS_VERSION__: 'readonly',
    __VUEPRESS_DEV__: 'readonly',
    __VUEPRESS_SSR__: 'readonly',
    __VUE_HMR_RUNTIME__: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts', '*.vue', '*.tsx'],
      extends: 'vuepress-typescript',
      parserOptions: {
        project: ['tsconfig.eslint.json'],
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'vue/match-component-file-name': [
          'error',
          {
            extensions: ['tsx', 'vue'],
            shouldMatchCase: false,
          },
        ],
      },
    },
    {
      files: ['**/__tests__/**/*.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  rules: {
    'no-undef': [false, ['defineEmits', 'defineProps']],
  },
}
