module.exports = {
  '*.{js,json}': 'prettier -w --ignore-path .prettierignore',
  '*.{ts,tsx}': () => 'turbo run lint --scope=@flux-ui/docs',
  'docs/**/*.{ts,tsx}': (filenames) =>
    `next lint --fix docs -c docs/.eslintrc --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`
};
