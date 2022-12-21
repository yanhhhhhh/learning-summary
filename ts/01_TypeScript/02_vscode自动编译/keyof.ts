interface Eg1 {
	name: string;
	readonly age: number;
}
// T1的类型实则是name | age
type T1 = keyof Eg1;

/**
 * @example
 * type A1 = 1
 */
type A1 = "x" extends "x" ? 1 : 2;

/**
 * @example
 * type A2 = 2
 */
type A2 = "x" | "y" extends "x" ? 1 : 2;

/**
 * @example
 * type A3 = 1 | 2
 */
type P<T> = T extends "x" ? 1 : 2;
type A3 = P<"x" | "y">;
const a2: A2 = 2;
const a3: A3 = 1;
