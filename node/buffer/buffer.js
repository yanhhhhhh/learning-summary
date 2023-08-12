const {Buffer} = require('node:buffer')


const buffer1 = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buffer1)
console.log(buffer1.toString())

const buffer2 = Buffer.alloc(10)
console.log(buffer2)

//fill
const buffer3 = Buffer.alloc(10,'a')   
console.log(buffer3)
// create an uninitialized buffer of length 10
// this is faster than calling Buffer.alloc() but the returned
// Buffer instance might contain old data that needs to be overwritten using full(),write(),or other functions that fill the Buffer's contents
const buffer4 = Buffer.allocUnsafe(10)
console.log(buffer4.fill('a'))
 

const buffer5 = Buffer.alloc(2,0x61,"binary")
console.log(buffer5.toString('hex'),'---',buffer5.toString("binary"),buffer5.toString())

