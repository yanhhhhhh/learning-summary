
function getSum(){
    // arguments 为类数组
    console.log('arguments',arguments);
    console.log('typeof arguments',typeof arguments);
    console.log('arguments[0]',arguments[0]);
    let sum = 0;
    for(let i= 0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    console.log('sum',sum);
}
getSum(1,2,3,4,5)