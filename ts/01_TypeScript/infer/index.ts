type T1<T> = T extends Array<infer Item> ? Item : never;

type a1 = T1<string[]>;
