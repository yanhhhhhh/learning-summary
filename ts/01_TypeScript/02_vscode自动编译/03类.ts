(()=>{
  interface Person{
    firstName: string;
    lastName: string;
  }
  class Person{
    firstName: string;
    lastName: string;
    fullName: string;
    constructor(firstName: string, lastName: string){
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = firstName + '-' + lastName 
    }
  }
  function fullName(person: Person){
    return person.fullName
  }
  const person = new Person('Jae','h')
  console.log(person)

  console.log(fullName(person))
}

)()