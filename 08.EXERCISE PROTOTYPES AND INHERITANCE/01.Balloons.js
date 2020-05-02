// function solve() {       // from the word file
//     class Balloon {
//         constructor(color, gasWeight) {
//             this.color = color;
//             this.gasWeight = gasWeight;
//         }
//     }

//     class PartyBalloon extends Balloon {
//         constructor(color, gasWeight, ribbonColor, ribbonLength) {
//             super(color, gasWeight);
//             this.ribbonColor = ribbonColor;
//             this.ribbonLength = ribbonLength;
//             this._ribbon = { color: ribbonColor, length: ribbonLength }  // object property
//         }

//         get ribbon() {
//             return this._ribbon;
//         }
//     }

//     class BirthdayBalloon extends PartyBalloon {
//         constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
//             super(color, gasWeight, ribbonColor, ribbonLength);
//             this._text = text;
//         }
//         get text() {
//             return this._text;
//         }
//     }

//     return {                 // module.exports = {.......}
//         Balloon: Balloon,    // или само Balloon... Когато името и стойността съвпадат, се пише само веднъж
//         PartyBalloon: PartyBalloon,
//         BirthdayBalloon: BirthdayBalloon
//     }
// }

// let classes = solve();
// let test = new classes.PartyBalloon("Tumno-bqlo", 20.5, "Svetlo-cherno", 10.25);
// let ribbon = test.ribbon;
// console.log(ribbon.color);
// // expect(ribbon.color).to.be.equal("Svetlo-cherno","'PartyBalloon ribbon color' does not return correct results");



function solve() {
    function Balloon(color, gasWeight) {
        this.color = color;
        this.gasWeight = gasWeight;
    }

    function PartyBalloon(color, gasWeight, ribbonColor, ribbonLength) {
        Balloon.call(this, color, gasWeight);
        this.ribbonColor = ribbonColor;
        this.ribbonLength = ribbonLength;

        Object.defineProperty(this, "ribbon", {
            get: function () {
                return { color: ribbonColor, length: ribbonLength };
            }
        })
    }

    Object.setPrototypeOf(PartyBalloon, Balloon);   // линкването на наследника с парент класа
    // PartyBalloon.prototype = Object.create(Balloon.prototype);
    PartyBalloon.prototype.constructor = PartyBalloon;

    function BirthdayBalloon(color, gasWeight, ribbonColor, ribbonLength, text) {
        PartyBalloon.call(this, color, gasWeight, ribbonColor, ribbonLength);
        this._text = text;

        Object.defineProperty(this, "text", {
            get: function() {
                return this._text;
            }
        })
    }

    Object.setPrototypeOf(BirthdayBalloon, PartyBalloon);
    // BirthdayBalloon.prototype = Object.create(PartyBalloon.prototype);
    BirthdayBalloon.prototype.constructor = BirthdayBalloon;

    return {
        Balloon: Balloon,
        PartyBalloon: PartyBalloon,
        BirthdayBalloon: BirthdayBalloon
    }
}


let classes = solve();
let test = new classes.PartyBalloon("Tumno-bqlo", 20.5, "Svetlo-cherno", 10.25);
let ribbon = test.ribbon;
console.log(ribbon.color);
// expect(ribbon.color).to.be.equal("Svetlo-cherno","'PartyBalloon ribbon color' does not return correct results");



