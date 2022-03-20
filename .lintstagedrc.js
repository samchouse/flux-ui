module.exports = {
  '*.json': (filenames) =>
    `prettier -w --ignore-path .prettierignore ${filenames.join(' ')}`,
  '*.{js,mjs,ts,tsx}': (filenames) =>
    `eslint --ignore-path .gitignore ${filenames.join(' ')}`,
  'packages/**/*.{ts,tsx}': (filenames) =>
    `turbo run lint --scope=!@flux-ui/docs -- ${filenames.join(' ')}`,
  'docs/**/*.{ts,tsx}': (filenames) =>
    `next lint --fix docs -c docs/.eslintrc --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`
};
