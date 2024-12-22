/** @type {import('@trivago/prettier-plugin-sort-imports').PluginConfig & import('prettier').Config} */
module.exports = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrder: [
    '^server-only(.*)$',
    '^@/components(.*)$',
    '^@/pages(.*)$',
    '^@/hooks(.*)$',
    '^@/domains(.*)$',
    '^@/utils(.*)$',
    '^@/styles/(.*)$',
    '^@/(.*)$',
    '^[./]',
    '^',
  ],
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  tailwindFunctions: ['cn'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: false,
}