/**
 * Create an array of the specified number and execute the function with the specified number as an argument.
 *
 * @param length Length of the array
 * @param callback Function with the specified number as an argument
 * @returns An array of the specified number
 * @example
 * It is the same as the following functions.
 * ```
 * Array.from({ length }, (_, index) => callback(index))
 * Array(length).fill(0).map((_, index) => callback(index))
 * ```
 */
export function arrayMap<T> (
  length: number,
  callback: (index: number) => T
): T[] {
  return Array.from({ length }, (_, index) => callback(index))
}
