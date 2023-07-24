import { cleanup } from "@testing-library/react";
import getRandomNumber from "./getRandomNumber";

afterEach(() => {
  cleanup();
});

test("returns a value that is not undefined", () => {
  expect(getRandomNumber(10)).not.toBeUndefined();
});
