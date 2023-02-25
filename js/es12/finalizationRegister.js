let obj = { name: "yanhhhhh" };
console.log(obj);
const r = new FinalizationRegistry((msg) => console.log("我被清除了", msg));
r.register(obj, "111");
obj = null;
