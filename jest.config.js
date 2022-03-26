module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  maxWorkers: '50%',
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.{ts,tsx}',
    '!**/index.ts',
    '!**/*.stories.tsx',
    '!packages/core/src/theme/common.ts',
    '!packages/hooks/src/use-isomorphic-effect/use-isomorphic-effect.ts'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/'],
  moduleNameMapper: {
    '^@flux-ui/(.*)$': '<rootDir>/packages/$1/src'
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: false,
            dynamicImport: true
          },
          externalHelpers: true,
          transform: {
            react: {
              runtime: 'automatic'
            }
          },
          loose: false,
          minify: {
            compress: false,
            mangle: true,
            format: {
              comments: true
            }
          },
          target: 'es2022'
        },
        minify: false,
        module: {
          type: 'es6'
        }
      }
    ]
  }
};
