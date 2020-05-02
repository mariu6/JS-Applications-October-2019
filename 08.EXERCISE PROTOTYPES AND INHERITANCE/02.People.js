function solve() {
    class Employee {
        constructor(name, age) {
            if (new.target === Employee) {
                throw new Error(`Cannot instantiate directly.`);
            }
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = [];
        }
        work() {                                    // за да превъртам безкрайно елементите от масива
            let currentTask = this.tasks.shift();   // взимам/отрязвам първия елемент
            console.log(this.name + currentTask);   // принтирам съобщението с него
            this.tasks.push(currentTask);           // добавям взетия елемент като последен в масива
        }

        collectSalary() {
            console.log(`${this.name} received ${this.getSalary()} this month.`);
        }

        getSalary() {   // getSalary е заплата + бонус
            return this.salary;
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            // Правя масив с възможните дейности, като пушвам елементите един по един 
            this.tasks.push(` is working on a simple task.`);
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            // Правя масив с възможните дейности, като пушвам елементите един по един
            this.tasks.push(` is working on a complicated task.`);
            this.tasks.push(` is taking time off work.`);
            this.tasks.push(` is supervising junior workers.`);
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.dividend = 0;
            // Правя масив с възможните дейности, като пушвам елементите един по един
            this.tasks.push(` scheduled a meeting.`);
            this.tasks.push(` is preparing a quarterly report.`);
        }
        getSalary() {            // override getSalary from parent
            return this.salary + this.dividend;
        }
    }

    return { Employee, Junior, Senior, Manager }
}








// function work() {
//     let task = [`${this.name} is working on a simple task.`,
//     `${this.name} is working on a complicated task.`,
//     `${this.name} is taking time off work.`,
//     `${this.name} is supervising junior workers.`,
//     `${this.name} scheduled a meeting.`,
//     `${this.name} is preparing a quarterly report.`];
//     let i = 0;
//     return function () {
//         if (i >= task.length) {
//             i = 0;
//         }
//         i++;
//         return task[i - 1];
//     }
// }


// let a = work();
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());
// console.log(a());


// Решение с функции на Станимир Тодоров
// function () {
//     function Employee(name, age) {
//         this.name = name;
//         this.age = age;
//         this.salary = 0;
//         this.dividend = 0;
//         this.tasks = [];
 
//         this.work = function () {
//             let currentTask = this.tasks.shift();
//             console.log(`${this.name}${currentTask}`);
//             this.tasks.push(currentTask);
//         }
//         this.collectSalary = function () {
//             console.log(`${this.name} received ${this.salary + this.dividend} this month.`);
//         };
//     }
 
//     function Junior(name, age) {
//         Employee.call(this, name, age);
//         this.tasks = [' is working on a simple task.'];
//     }
 
//     Junior.prototype = Object.create(Employee.prototype);
//     // Object.setPrototypeOf(Junior, Employee);
//     // Junior.prototype.constructor = Junior;
 
//     function Senior(name, age) {
 
//         Employee.call(this, name, age);
//         this.tasks = [' is working on a complicated task.', ' is taking time off work.', ' is supervising junior workers.'];
//     }
 
//     Senior.prototype = Object.create(Employee.prototype);
//     // Object.setPrototypeOf(Senior, Employee)
//     // Senior.prototype.constructor = Senior;
 
//     function Manager(name, age) {
//         Employee.call(this, name, age);
//         this.tasks = [' scheduled a meeting.', ' is preparing a quarterly report.'];
//     }
 
//     Manager.prototype = Object.create(Employee.prototype);
//     // Object.setPrototypeOf(Manager, Employee);
//     // Manager.prototype.constructor = Manager;
 
//     return { Employee, Junior, Senior, Manager }
// }