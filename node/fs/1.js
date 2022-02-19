const fs = require('fs')
fs.readFile('./fs/1.txt','utf-8',function(err,data){
    if(err){
        console.log('文件读取失败',err.message);
        return;
    }else{
        console.log('文件读取结果',data);
    }

})
fs.writeFile('./fs/1.txt','hello','utf-8',(err)=>{
    if(err){
        console.log(err);
    }
})
fs.readFile('./fs/1.txt','utf-8',function(err,data){
    if(err){
        console.log('文件读取失败',err.message);
        return;
    }else{
        console.log('文件读取结果',data);
    }

})