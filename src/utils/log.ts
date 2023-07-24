/**
 * @description show console logs only in dev mode
 * @param args
 * @returns
 *  - empty function if we are in production
 *  - otherwise it returns undefined (default return value for any js function)
 */
export default function log(...args: any[]) {
  if (process.env.NODE_ENV === "production") {
    return () => {};
  } else {
    console.log(...args);
  }
}
