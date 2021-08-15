
// interface Human {
//     name: string,
//     gender: string,
//     age: number
// }
class Human{
    public name: string;
    private age: number;
    public gender: string;

    constructor(name:string, age:number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    get getAge(){
        return this.age
    }
}

const kezi = new Human("kezi", 22, "male");
const sayHi = (person: Human): string =>{
    return `Heloo ${person.name}, you are ${person.getAge}, you are a ${person.gender}`
}

console.log(sayHi(kezi));

export {};