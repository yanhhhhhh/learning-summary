# Object

## Object.is

### Object.is 判断相等

1. 都是 `undefined`
   ```js
   console.log(Object.is("undefined", "undefined")); //true
   ```
2. 都是`null`
   ```js
   console.log(Object.is("null", "null")); //true
   ```
3. 都是 数字
   - 且都是`+0`
   - 且都是`-0`
   - 且都是`NaN`
   - 都是相同的数字

```js
console.log(Object.is(-0, 0)); //false
console.log(Object.is(+0, +0)); //true
console.log(Object.is(-0, -0)); //false
console.log(Object.is(NaN, NaN)); //true
```

4. 都是相同的对象引用(两个值都引用了内存中的同一对象)
   ```js
   const object = {};
   const tempObject = object;
   console.log(Object.is(object, tempObject)); //true,是相同的对象引用
   console.log(Object.is(object, {})); //false,不是相同的对象引用
   ```
