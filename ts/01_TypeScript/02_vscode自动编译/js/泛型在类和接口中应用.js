(function () {
    //  泛型在类中的应用
    var Queue = /** @class */ (function () {
        function Queue() {
            this.data = [];
        }
        Queue.prototype.push = function (item) {
            this.data.push(item);
        };
        Queue.prototype.pop = function () {
            return this.data.pop();
        };
        return Queue;
    }());
    var queue = new Queue();
    // queue.push('hello') //泛型传入number，则队列数据需全部是number类型
    queue.push(1);
    var Person = {
        key: 'hhh',
        value: 18
    };
    var APerson = {
        key: 111,
        value: 'hhh'
    };
})();
