function solve() {
    let obj = {

        init(num1 = 0, num2 = 0, result) {
            this.num1 = Number(num1);
            this.num2 = Number(num2);
            this.result = result;
        },
        add() {
            this.result = Number(this.num1) + Number(this.num2);
            return document.getElementById("result").value = this.result;
        },
        subtract() {
            this.result = Number(this.num1) - Number(this.num2);
            return document.getElementById("result").value = this.result;
        }
    }




    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById("sumButton").addEventListener("click", function () {
            obj.init()
            let num1 = document.getElementById("num1").value;
            let num2 = document.getElementById("num2").value;
            let result = document.getElementById("result").value;
            // let sum = new obj(num1, num2, result);
            obj = Object.assign(obj, { num1, num2 })
            return obj.add();
        });
        document.getElementById("subtractButton").addEventListener("click", function () {
            obj.init()
            let num1 = document.getElementById("num1").value;
            let num2 = document.getElementById("num2").value;
            let result = document.getElementById("result").value;
            // let sum = new obj(num1, num2, result);
            obj = Object.assign(obj, { num1, num2 })
            return obj.subtract();
        });
    })
    return obj;
}


let obj = solve();

obj.init("#num1","#num2",'#result');
let num1 = $('#num1');
let num2 = $('#num2');
let res = $('#result');
num1.val(5);
num2.val(3);
console.log(obj.add());
