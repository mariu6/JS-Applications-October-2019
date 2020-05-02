function personAndTeacher() {
    class Person {
        // name;
        // email;
        constructor(n, em) {
            this.name = n;
            this.email = em;
        }
    }
    class Teacher extends Person {
        // subject;
        constructor(n, em, sub) {
            super(n, em);
            this.subject = sub;
        }
    }
    return {
        Person, Teacher
    }
}

let classes = personAndTeacher();
let Teacher = classes.Teacher;
let Person = classes.Person;

let t = new Teacher('mesho', 'mesho@pesho.com', 'Meshematika');
console.log(t);