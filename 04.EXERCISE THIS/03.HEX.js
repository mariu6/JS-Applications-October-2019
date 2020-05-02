class Hex {
    constructor(value) {
        this.value = Number(value);   // или без Number? Пак върви
    }

    valueOf() {
        return this.value;
    }
    // This function should return the value property of the Hex class.
    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`;   // 16 hex, може 2, 8 и т.н. 
    }
    // This function will show its hexidecimal value starting with "0x"

    plus(hexObject) {   // приемат hex обект и трябва да се върне нов hex обект
        if (hexObject instanceof Hex) {
            return new Hex(this.value + hexObject.valueOf())   // събираме инстанциите на Hex{} и връщаме нов обект
        }
    }
    // This function should add a number or Hex object and return a new Hex object.

    minus(hexObject) {   // приемат hex обект и трябва да се върне нов hex обект
        if (hexObject instanceof Hex) {
            return new Hex(this.value -  hexObject.valueOf())   // събираме инстанциите на Hex{} и връщаме нов обект
        }
    }
    // This function should subtract a number or Hex object and return a new Hex object.

    parse(hexString) {
        return parseInt(hexString, 16);   // parseInt означава към десетична с-ма, а базата - от какво превръщаме (м/у бинарно 2 и 32-рно 32)
    }
    // Create a parse class method that can parse Hexidecimal numbers and convert them to standard decimal numbers.

    // Submission
    // Submit only your Hex class.
    // Examples
    // This is an example how the code is intended to be used:

}



let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === '0xF');

