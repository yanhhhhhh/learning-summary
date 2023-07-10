const array = [[1, 2], [3, 4], [5, 7]].reduce((cur, pre) => {
  return [...cur, ...pre]
}, [])
console.log(array);
