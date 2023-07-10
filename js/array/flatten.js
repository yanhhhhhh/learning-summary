function flatten(arr){
  let reslut =[]
  for(let i =0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      reslut.push(...flatten(arr[i]))

    }else{
      reslut.push(arr[i])
    }
  }
  return reslut
}
const array =[1,[2,[3,5]]]
console.log(flatten(array))