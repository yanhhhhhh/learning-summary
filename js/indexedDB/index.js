var db, db_table;
var request = window.indexedDB.open("group", 1);
//创建失败
request.error = function (error) {
  console.log("IndexedDB 打开失败", error);
};
//创建成功
request.onsuccess = function (res) {
  console.log("IndexedDB 打开成功", res);
  db = res.target.result;
};
//数据仓库升级事件（第一次新建库也会触发)

request.onupgradeneeded = function (res) {
  console.log("IndexedDB 升级成功", res);
  db = res.target.result;
  console.log({ db });
  db_table = db.createObjectStore("group", {
    keyPath: "id",
  });
  db_table.createIndex("indexName", "name", {
    unique: false,
  });
};

console.log(db);
var store = db.transaction(["group"], "readwrite").objectStore("group");
// 添加数据
var addRequest = store.add({
  id: new Date().getTime(),
  name: "hhh",
  age: 18,
});
addRequest.onsuccess = function (event) {
  console.log("添加成功,", event);
};
addRequest.onerror = function (event) {
  console.log("添加失败，", event);
};
