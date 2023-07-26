export function calculatElapsedMilliseconds(
  startTimeInMilliseconds: number,
  endTimeInMilliseconds: number
) {
  return endTimeInMilliseconds - startTimeInMilliseconds;
}

export function convertMillisecondsToSeconds(ms: number) {
  return ms / 1000;
}
