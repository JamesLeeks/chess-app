// From https://jest-extended.jestcommunity.dev/docs/getting-started/setup

// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);

// // or just add specific matchers
// import { toBeArray, toBeSealed } from 'jest-extended';
// expect.extend({ toBeArray, toBeSealed });