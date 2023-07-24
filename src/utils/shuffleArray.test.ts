import { cleanup } from "@testing-library/react";
import { shuffleArray } from "./shuffleArray";

afterEach(() => {
  cleanup();
});

let testArr = [1, 2, 3];
let arraySubjectToShuffling = Array.from(testArr);
shuffleArray(arraySubjectToShuffling);

test("shuffleArray", () => {
  expect(testArr).toBeDefined();
  expect(arraySubjectToShuffling).toBeDefined();
  expect(testArr).not.toEqual(arraySubjectToShuffling);
});
