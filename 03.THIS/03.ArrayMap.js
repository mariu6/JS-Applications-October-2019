function arrayMap(arr, fn) {
    return arr.reduce((a, b) => a.concat(fn(b)), []);      // или
    // return arr.reduce((a,b) => [...a,fn(b)],[]);
}


let nums = [1, 2, 3, 4, 5];
console.log(arrayMap(nums, (item) => item * 2)); // [ 2, 4, 6, 8, 10 ]

let letters = ["a", "b", "c"];
console.log(arrayMap(letters, (l) => l.toLocaleUpperCase())) // [ 'A', 'B', 'C' ]




// function arrayMap(arr, fn) {                            // императивен вариант, по-добър за много големи масиви.
//     let newArr = new Array(arr.length);
//     for (let i = 0; i < newArr.length; i++) {
//         newArr[i] = fn(arr[i])
//     }
//     return newArr;
// }

// function arrayMap(arr,fn) {     // само с .map
//     return arr.map(fn);
// }



Array.prototype.aMap = function (fn) {          // решение със създаване на пропърти за масива
    let newArr = new Array(this.length);        // вече масивът ни е this, защото ще извикваме пропъртито върху него
    for (let i = 0; i < this.length; i++) {
        newArr[i] = fn(this[i])
    }
    return newArr;
}
letters = ["a", "b", "c", "d", "e "];
console.log(letters.aMap((l) => l.toLocaleUpperCase())) // [ 'A', 'B', 'C' ]
