// // Първо трябва да се инициализира масив от тюпъли   // let sizes = [[1, 20], [20, 1], [5, 3], [5, 3]];
// // после се създава инстанция на функцията           // let sortedRectangles = result(sizes);
// function result(data) {
//     const template = {      // Темплейт обект с нулеви дължина и ширина, но с функции - площ и сравниКъм;
//         width: 0,
//         height: 0,
//         area: function () {
//             return this.width * this.height;
//         },
//         compareTo: function (obj) {
//             return this.area() - obj.area() === 0 ? obj.width - this.width : obj.area() - this.area();
//             // if (this.area() - obj.area() === 0) {
//             //     if (this.width - obj.width > 0) {
//             //         return -1;   // negative
//             //     } if (this.width - obj.width === 0) {
//             //         return 0;    // no change
//             //     } else {
//             //         return 1;    // positive
//             //     }
//             // } else {
//             //     return obj.area() - this.area();
//             // }
//         }
//     }

//     return data.map(([width, height]) => {                          // превърта data с map()
//         // const newObj = Object.create(template);     // за всеки тюпъл прави нов обект
//         // newObj.width = width;                        // добавя пропъртита width and height
//         // newObj.height = height;
//         // return newObj;                                // връща всеки обект като елемент в масива 

//         // return {...template}    // горните 4 реда не са нужни. КОПИРА ТЕМПЛЕЙТА ЗАЕДНО С ФУНКЦИИТЕ    

//         return Object.assign(Object.create(template), { width, height }) // друг вариант, с Obj assign, където
//         // присъедини към обекта(таргет: създай нов обект(от темплейт) , добави обект с пропеъртита{дължина, ширина})

//     }).sort((a, b) => a.compareTo(b));              // и го сортира, като използва compareTo и area
// }


let sizes = [[1, 20], [20, 1], [5, 3], [5, 3]];

let sortedRectangles = result(sizes);
console.log(sortedRectangles);
console.log(sortedRectangles[0].compareTo(sortedRectangles[1]));


function result(data) {
    class Template {
        // width = 0;
        // height = 0;
        constructor(wid,heig) {
            this.width = wid;
            this.height = heig;
        }
        area() {
            return this.width * this.height;
        }
        compareTo(obj) {
            return this.area() - obj.area() === 0 ? obj.width - this.width : obj.area() - this.area();
        }
    }

    return data.map(([width, height]) => new Template(width, height)).sort((a, b) => a.compareTo(b))
}










