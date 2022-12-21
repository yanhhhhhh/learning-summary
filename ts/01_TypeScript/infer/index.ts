type T1<T> = T extends Array<infer Item> ? Item : never;
