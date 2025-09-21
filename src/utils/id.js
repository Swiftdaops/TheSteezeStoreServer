import { customAlphabet } from "nanoid";
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const nano = customAlphabet(alphabet, 8);
export const genId = (prefix) => `${prefix}_${nano()}`; // e.g. ord_ab12cd34
