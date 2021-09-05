module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'at-rule-empty-line-before': 'never',
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-custom-properties': false,
    'named-grid-areas-no-invalid': null,
    'no-irregular-whitespace': false,
    'no-invalid-position-at-import-rule': null,
    'CssSyntaxError': null,
    'selector-pseudo-element-colon-notation': 'single',
  },
}
