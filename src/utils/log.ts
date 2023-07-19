export default function log(...args: any[]) {
  if (process.env.NODE_ENV === "production") {
    return () => {};
  } else {
    console.log(...args);
  }
}
