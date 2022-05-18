(function () {
    function FullName(person) {
        return person.firstName + '-' + person.lastName;
    }
    var person = {
        firstName: 'Jae',
        lastName: 'Park'
    };
    console.log(FullName(person));
})();
