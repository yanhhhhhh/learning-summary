(function () {
    var Person = /** @class */ (function () {
        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + '-' + lastName;
        }
        return Person;
    }());
    function fullName(person) {
        return person.fullName;
    }
    var person = new Person('Jae', 'h');
    console.log(person);
    console.log(fullName(person));
})();
