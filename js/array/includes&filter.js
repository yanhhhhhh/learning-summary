const arr1 = [{
  id: 0,
  name: 0,
},
{
  id: 1,
  name: 1,
},
{
  id: 2,
  name: 2,
},
]
const arr2 = [0, 1

]
const arr3 = arr1.filter((item) => !arr2.includes(item.id))
console.log(arr3);