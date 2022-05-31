module.exports = {
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'none',
  importOrder: [
    '<THIRD_PARTY_TYPES>',
    '^@flux-ui/(.*)$',
    '<TYPE>^@flux-ui/(.*)$',
    '^[./]',
    '<TYPE>^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('@xenfo/prettier-plugin-sort-imports')]
};
