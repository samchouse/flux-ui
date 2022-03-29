module.exports = {
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'none',
  importOrder: ['^@flux-ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    'decorators-legacy'
  ],
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')]
};
