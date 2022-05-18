(()=>{
  interface Person{
    firstName: string;
    lastName: string;
  }
  function FullName(person: Person){
    return person.firstName + '-' + person.lastName ;
  }
  const person = {
    firstName: 'Jae',
    lastName: 'Park'
  }
  console.log(FullName(person));
}

)()