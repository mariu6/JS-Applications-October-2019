// const app = {
//     handleEvent: function (e) {
//         if (typeof this[e.target.id] === "function") {         // this[e.target.id] има id=dropdown
//             this[e.target.id]();        // изпълнява функцията, така няма нужда от ивентлисънър на всяко бутонче, само на документа
//         }

//         if (e.target.classList.value.match("deep")) {         
//             this.setBoxColor(e.target.textContent)   // this e targeta
//         }

//     },
//     dropdown: function () {                                  // правим функция със същото име като бутона
//         const ul = document.getElementById("dropdown-ul");
//         if (ul.style.display === "block") {
//             ul.style.display = "none";
//             this.setBoxColor("")
//         } else {
//             ul.style.display = "block";
//         }
//     },

//     setBoxColor: function (color) {
//         const box = document.getElementById("box");
//         box.style.backgroundColor = color;     
//     }
// }

// function solve() {
//     document.addEventListener("DOMContentLoaded", function () {
//         document.addEventListener("click", {
//             handleEvent: function (e) {
//                 console.log(e.target.id);
//                 if (typeof this[e.target.id] === "function") {         // this[e.target.id] има id=dropdown
//                     this[e.target.id]();        // изпълнява функцията, така няма нужда от ивентлисънър на всяко бутонче, само на документа
//                 }

//                 if (e.target.classList.value.match("deep")) {         
//                     this.setBoxColor(e.target.textContent)   // this e targeta
//                 }
//             return e.target.textContent;
//             },
//             dropdown: function () {                                  // правим функция със същото име като бутона
//                 const ul = document.getElementById("dropdown-ul");
//                 if (ul.style.display === "block") {
//                     ul.style.display = "none";
//                     this.setBoxColor("")
//                 } else {
//                     ul.style.display = "block";
//                 }
//                 return ul.style.display;
//             },

//             setBoxColor: function (color) {
//                 const box = document.getElementById("box");
//                 box.style.backgroundColor = color;     
//                 return box.style.backgroundColor;
//             }
//         })
//     })
// }


function solve() {
    let button = document.getElementById("dropdown");
    let ul = document.getElementById("dropdown-ul");
    let box = document.getElementById("box");
    button.addEventListener("click", function () {
        setBoxColor("black")
        box.style.color = "white";
        if (ul.style.display === "block") {
            ul.style.display = "none";
        } else {
            ul.style.display = "block";
        }
    })
    ul.addEventListener("click", function (e) {
        let color = e.target.textContent;
        setBoxColor(color);
    })

    function setBoxColor(color) {
        box.style.backgroundColor = color;
        box.style.color = "black";
        return;
    }
}


























