let a: never;
let bar: never = (() => {
	throw new Error("Typescrpt error");
})();

function infiniteLoop(value: string): never {
	while (true) {}
}

// `never` 为底层类型，任何类型与`never` 的交叉都得到`never`
export type T1 = number & never;

type T2 = string & never;
type T3 = number | never;

type T4 = string | never;
