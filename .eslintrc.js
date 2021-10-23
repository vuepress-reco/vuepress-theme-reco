module.exports = {
  root: true,
  extends: 'vuepress',
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
    'no-undef': [2, { 'defineEmits': false, 'defineProps': false, 'describe': false, 'it': false }],
    'import/no-extraneous-dependencies': 'off',
    'vue/no-v-html': 0,
  },
}
