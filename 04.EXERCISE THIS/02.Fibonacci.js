function getFibonator() {
    let previousElem = 0;   // тези променливи са ни "в клоужъра"
    let currentElem = 1;    // и се извикват само веднъж, при инициализирането на let fib = getFibonator()

    return function () {   // при извикване на fib() идва направо на return fn() и я изпълнява
        const result = previousElem + currentElem;     
        previousElem = currentElem;                            
        currentElem = result;                         

        return previousElem;
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13 
