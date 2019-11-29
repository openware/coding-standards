module.exports = {
    'transform': {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
    'transformIgnorePatterns': [
        "<rootDir>/node_modules/(?!lodash-es)"
    ],
    'testRegex': '(<rootDir>/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    'moduleFileExtensions': [
        'ts',
        'js',
        'json',
        'node',
    ],
    'collectCoverage': false,
    'collectCoverageFrom': [
        "<rootDir>/src/**/*.{ts,js}",
    ],
};
