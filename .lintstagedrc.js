module.exports = {
  '*.{js,json}': 'prettier -w --ignore-path .prettierignore',
  '*.{ts,tsx}': 'yarn lint -- --fix',
  'docs/*.{ts,tsx}': (filenames) =>
    `next lint --fix docs --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`
};
