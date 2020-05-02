function toStringExtension() {
    class Person {
        // name;
        // email;
        constructor(n, em) {
            this.name = n;
            this.email = em;
        }
        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`
        }
    }
    class Teacher extends Person {
        // subject;
        constructor(n, em, sub) {
            super(n, em);
            this.subject = sub;
        }
        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email}, subject: ${this.subject})`
        }
    }
    class Student extends Person {
        // course;
        constructor(n, em, course) {
            super(n, em);
            this.course = course;
        }
        toString() {
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email}, course: ${this.course})`
        }
    }
    return {
        Person, Teacher, Student
    }
}

let classes = toStringExtension();
let Person = classes.Person;
let Teacher = classes.Teacher;
let Student = classes.Student;

let p = new Person("Pesho", 'Pesho@pesh.com');
// expect(p.toString()).to.equal('Person (name: Pesho, email: Pesho@pesh.com)');

console.log(p.toString());


let t = new Teacher("Gosho", 'gosh@gosh.com', "Graphics")
// expect(t.toString()).to.equal('Teacher (name: Gosho, email: gosh@gosh.com, subject: Graphics)');
console.log(t.toString());