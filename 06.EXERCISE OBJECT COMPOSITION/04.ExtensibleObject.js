
function result() {
    let myObj = {};
    Object.prototype.extensionMethod = function(template) {
        return Object.assign(this, template);
    }
    myObj.extend = function (template) {
        return Object.assign(this, template);
    }
    return myObj;
}
// let {expect} = require("chai")

var template = {
    mana:10,
    extensionMethod: function () {
        console.log("From extension method")
    }
};

var testObject = result();
testObject.extend(template);
testObject.extensionMethod();
console.log(testObject)
console.log(Object.getPrototypeOf(testObject).hasOwnProperty('extensionMethod'));
console.log(Object.getPrototypeOf(testObject))


// var template = {
//     fight: function(target) { return `object fights with ${target}` },
//     health: 100,
//     mana: 50
// };

// var testObject = result();
// testObject.extend(template);
// expect(Object.getPrototypeOf(testObject).hasOwnProperty('fight')).to.equal(true, "Object's prototype was not extended");
// expect(testObject.hasOwnProperty('health')).to.equal(true, "Template properties were not cloned correctly.");
// expect(testObject.hasOwnProperty('mana')).to.equal(true, "Template properties were not cloned correctly.");
// expect(testObject.fight('me')).to.equal('object fights with me', "Extension method wasn't cloned correctly.");