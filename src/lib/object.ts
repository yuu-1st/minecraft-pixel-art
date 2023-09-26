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

/**
 * This function is used in default clause of switch statement.
 * This function guarantees that control never reach the default clause.
 * @param x argument of switch statement
 */
export const assertNever = (x: never): never => {
  throw new Error('This code should not be called')
}

/**
 * Returns a promise that resolves after the specified time.
 * @param ms Time to wait in milliseconds
 */
export async function sleep (ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms))
}
