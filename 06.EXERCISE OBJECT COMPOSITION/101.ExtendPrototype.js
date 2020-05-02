class SomeClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

function solve(SomeClass) {
    SomeClass.prototype.species = "Human";
    SomeClass.prototype.toSpeciesString = function() {
        return `I am a ${this.species}. ${this.toString()}`
    }
}

let man = new SomeClass("A",24)
man.gender = "male";
console.log(man)
solve(SomeClass)
console.log(man.toSpeciesString())

