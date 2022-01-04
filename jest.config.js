module.exports = {
  preset: "ts-jest",
  globalSetup: "<rootDir>/src/setupTestEnv.ts",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx,js,jsx}"],
  moduleNameMapper: {
    "^src(.*)": "<rootDir>/src$1",
  },
};
