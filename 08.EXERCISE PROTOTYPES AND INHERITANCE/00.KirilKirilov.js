function Human(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    // this.fullName = function () {       // това пропърти ще влезе във всички инстанции. Не е метод, няма го в __proto__
    //     return `${this.firstName} ${this.lastName}`;
    // }
};

Human.prototype.fullName = function () {      // Това го няма в инстанцията като променлива, влиза в __proto__ 
    return `${this.firstName} ${this.lastName}`;
}

const p1 = new Human("Kiril", "Kirilov");
console.log(p1.fullName);


const p2 = new Human("Petar", "Petrov");
console.log(p2.fullName);


// Проверка дали две инстанции са еднаква референция:
console.log(p1.__proto__.fullName === p2.__proto__.fullName);  // true     ...Вече не се използва
console.log(Object.getPrototypeOf(p1) === Object.getPrototypeOf(p2));  //  ще вземе __proto__ 


// new e ключова дума зя създаване на инстанция на клас или функция:
// let instance = {} -> connect prototypes -> set instance properties -> return instance
// пример какво прави ключа new:
function Man(firstName, lastName) {
    let instance = {};
    Object.setPrototypeOf(instance, Man.prototype);  // създаваме връзка - instance.__proto__= Human.prototype. Judge го приема   
    // първи параметър - инстанцията, втори параметър - prototype-a, към който иска да сочи тази инстанция
    instance.firstName = firstName;
    instance.lastName = lastName;
    return instance;
};

const m1 = Man("Kiril", "Kirilov"); // извиквам го без new
console.log(m1.firstName);

Man.prototype.fullName = function () {
    return `${this.firstName} ${this.lastName}`;
}
const m2 = Man("Petar", "Petrov");  //m2 става инстанция на Man
console.log(m2.fullName());    // Petar Petrov


// Наследяване на Human

function Student(firstName, lastName, facultyNumber) {   // тук нямаме наследяване(Student extends Human()), затова ползваме .call()
    Human.call(this, firstName, lastName);   // извикваме конструктора Human и сетваме пропъртитата (fname, lname)
    // this е контекста на инстанцирания студент, a не на Human
    this.facultyNumber = facultyNumber;
    this.grades = [3,4,5];
}

const s1 = new Student("Kiril", "Kirilov", "13738");
console.log(s1);  // Student {firstName: 'Kiril', lastName: 'Kirilov', facultyNumber: '13738' }
console.log(s1.__proto__);  // Student{}
// 00:35

// Object.create()
let obj = { name: "Pesho", age: 23 }
let secondObj = Object.create(obj);    // създаваме
console.log(secondObj.__proto__ === obj);  // true  ПРОТОТО НА НАСЛЕДНИКА Е РОДИТЕЛЯ
console.log(secondObj);   // {}   празен обект?!
console.log(secondObj.name);  // Pesho , което идва от __рroto__, ot obj (референцията е една и  съща) 


Student.prototype = Object.create(Human.prototype);  // пълним прототипа на студент с прототипа на хюман
// ако направим Student.prototype = Human.prototype; не е добре, защото ако променим нещо по студент, ще променим и в хюман! 
// или Object.setPrototypeOf(Student, Human);   // за да мине в judge... Обаче не работи! Трябва да се ползва с extends 

// остава още една стъпка за създаване на наследен обект
Student.prototype.constructor = Student;     //създаване на коструктор за протото (?)
// иначе ще достъпваме направо прототипа на парента и може да му влияем

const s2 = new Student("Aze", "Qze", "123"); 
// Явно тези операции не се хойстват, защото първо трябва да се извършат, после да се направи инстанция
console.log(s2.fullName()); // Като не намира fullName в инстанцията, го търси в __proto__  . Това е prototype chain

// След като сме линкнали Student към Human, всички методи вече ги пишем отдолу

Student.prototype.showGrades = function () {
    this.grades.join(" ");
}
s2.grades = [1,2,3];
console.log(s2.showGrades());


// 01:36


