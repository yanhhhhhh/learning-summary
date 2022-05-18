(function () {
    // 泛型可以理解为占位符
    function sayHi(msg) {
        return msg;
    }
    var str = sayHi('123');
    var number = sayHi(123);
    console.log(str);
    console.log(number);
    function swap(tuples) {
        return [tuples[1], tuples[0]];
    }
    var tuples = swap([1, 'hello']);
    console.log('tuples', tuples);
    function echoLength(args) {
        console.log(args.length);
        return args;
    }
    echoLength('string');
    echoLength([1, 2, 3]);
    echoLength({ length: 1 });
    // echoLength(1)//此处会报错说number不能赋值给IWithlength类型
})();
