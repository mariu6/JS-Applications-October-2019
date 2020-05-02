function solve() {    // функцията връща обект, можем да си инстанцираме с let obj = solve()
    return{
        elements: [],
        size: 0, //this.elements.length,    // this e (сочи към) func solve()
        add: function(element) {
          this.elements.push(element);   // this сочи към Object literal (инстанцията)
          this.elements.sort((a,b) => a-b);  
          this.size++;
        },
        remove: function(index) {
            if (index < 0 || index >= this.elements.length) {
                throw RangeError("Index is outside the bounds of the list");
            }
            this.elements.splice(index,1);
            this.size--;
        },
        get: function(index) {
            if (index < 0 || index >= this.elements.length) {
                throw RangeError("Index is outside the bounds of the list");
            }
            return this.elements[index];
        }
    }
}
let opa = solve();
console.log(opa.elements);
opa.add(1);
console.log(opa.elements);

// Instantiate and test functionality
let {expect} = require("chai");
var myList = solve();
var failsafe = 'failsafe';

try {
    failsafe = myList.get(0) ? myList.get(0) : 'failsafe';
} catch (e) {}

expect(myList.size).to.equal(0, "Unexpected behaviour with empty collection.");
expect(failsafe).to.equal('failsafe', "Unexpected behaviour with empty collection.");

try {
    myList.remove(0);
} catch (e) {}

expect(myList.size).to.equal(0, "Unexpected behaviour with empty collection.");