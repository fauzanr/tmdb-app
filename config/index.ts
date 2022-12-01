export const posterFallbackPath = "/tmdb_logo.jpeg";

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomByte = () => randomNumber(0, 255);

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

export const blurDataUrl = () =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, randomByte(), randomByte()) + triplet(randomByte(), 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
