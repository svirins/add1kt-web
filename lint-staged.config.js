module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'yarn run check-types',
  '*.json': ['prettier --write'],
};
