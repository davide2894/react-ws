// using the Fisher-Yates algorithm in combination with Math.Random()
// see: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// note:
//  - time complexity is O(n)
//  - source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm

export function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
