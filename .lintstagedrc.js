module.exports = {
  '*.{js,json}': 'prettier -w --ignore-path .gitignore',
  '*.{ts,tsx}': 'eslint --fix --ignore-path .gitignore',
  'docs/*.{ts,tsx}': (filenames) =>
    `next lint --fix docs --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`
};
