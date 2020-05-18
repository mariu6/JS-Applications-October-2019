import { get, post, put, del } from './request.js';                // внасяме си функциите от requester.js






const html = {       // този обект ми врръща референциите към ДОМ елементите
    "studentsData": () => document.getElementById("students-data"),       // трябва да се извикват като функции -> getAllBooks()
    // "id": () => document.getElementById("id"),
    // "getFirstN": () => document.getElementById("author"),
    // "getBookIsbn": () => document.getElementById("isbn"),
    // "getEditTitle": () => document.getElementById("edit-title"),
    // "getEditAuthor": () => document.getElementById("edit-author"),
    // "getEditIsbn": () => document.getElementById("edit-isbn"),
    // "getEditId": () => document.getElementById("edit-id")           // id на едитваната книга. Не се показва на страницата
}

const actions = {
    "extract": async function () {                             // ако ми остане време, ще имплементирам анти-спам кеширане на бутона за заявка
        try {                                                     //  try/catch замества промис() .then   .catch
            //фрагментът използва вграден метод. Ще колекционира t-rows редовете от таблицата и ще ги инсертне в ДОМ-а наведнъж, за по-малко ДОМ обработка
            const fragment = document.createDocumentFragment();
            let students = await get("appdata", "students");          // appdata ми е кинви модула (вж другия файл, рекуестър), букс е окончанието. Взимаме книгите, а
            const studentsContainer = html.studentsData();            // тук ще се добавя информацията за книгите от базата данни, които ще се дисплейнат при извикване
            students = students.sort((a, b) => a["ID"] - b["ID"]);
            console.log(students)
            students.forEach(s => {
                // създаваме си елементите по реда, по който ще ни дойдат от базата данни
                const tr = document.createElement("tr");   // общия, който държи останалите
                // const id_Td = document.createElement("td");
                const IdTd = document.createElement("td");
                const firstNameTd = document.createElement("td");
                const lastNameTd = document.createElement("td");
                const facultyNumberTd = document.createElement("td");
                const gradesTd = document.createElement("td");
                const actionsTd = document.createElement("td");   // обграждащ за двата бутона
                const editBtn = document.createElement("button");
                const deleteBtn = document.createElement("button");
                actionsTd.classList.add("trButtons");


                IdTd.textContent = s["ID"];   // попълваме си създадените елементи с информацията от базата данни
                firstNameTd.textContent = s["First Name"];
                lastNameTd.textContent = s["Last Name"];
                facultyNumberTd.textContent = s["Faculty Number"];
                gradesTd.textContent = Number(s["Grade"]).toFixed(2);

                editBtn.textContent = "Edit";                          // с всеки елемент накрая на реда имаме два бутона - Edit & Delete.
                editBtn.id = s._id;                                    // _id ,защото така идва от API-то. Ще се ползва за достъп до конкретния ред
                editBtn.addEventListener("click", this["edit-book-get"]);  // задаваме си ги отделно, защото са динамични. this сочи към actionsTd

                deleteBtn.textContent = "Delete";
                deleteBtn.id = s._id;
                deleteBtn.addEventListener("click", this["delete-book"]);

                actionsTd.appendChild(editBtn);       // апендвам двата бутона към actionsTd
                actionsTd.appendChild(deleteBtn);


                tr.append(IdTd, firstNameTd, lastNameTd, facultyNumberTd, gradesTd, actionsTd)   // Апендвам останалите елементи + бутоните към реда
                fragment.appendChild(tr);                         // апендвам реда към фрагмента
            });
            studentsContainer.innerHTML = "";                  // зачистваме списъка с книги
            studentsContainer.appendChild(fragment);           // принтираме списъка от базата данни
        } catch (error) {
            console.log(error);
            alert(error)
        }
    },
    "create": async function () {

        const $id = document.getElementById("create-id");
        const $firstName = document.getElementById("create-first");
        const $lastName = document.getElementById("create-last");
        const $facultyNumber = document.getElementById("create-faculty");
        const $grade = document.getElementById("create-grade");

        if ($id !== null && $firstName !== null && $lastName !== null && $facultyNumber !== null && $grade !== null) {
            if ($id.value !== null && $firstName.value !== null && $lastName.value !== null && $facultyNumber.value !== null && $grade.value !== null) {
                const data = {
                    "ID": $id.value,
                    "First Name": $firstName.value,
                    "Last Name": $lastName.value,
                    "Faculty Number": $facultyNumber.value,
                    "Grade": $grade.value
                }
                const students = await get("appdata", "students");
                const idArray = students.map(x => x["ID"]);
                console.log(idArray,data["ID"]);
                if (idArray.includes(data["ID"])) {
                    alert("Student with such ID already exists!");
                } else {
                    try {
                        const response = await post("appdata", "students", data);

                        $id.value = "";
                        $firstName.value = "";
                        $lastName.value = "";
                        $facultyNumber.value = "";
                        $grade.value = "";

                        this["extract"]();   // да пратим отново заявка да се заредят всички книги

                    } catch (error) {
                        console.log(error);
                        alert(error)            // изскачащ прозорец с текст на грешката
                    }
                }
            }
        }
    },

    // "edit-book-get": async function () {          // с този екшън зареждаме информацията за книгата в полетата
    //     const id = this.id;    // взимаме id на книгата, която ще едитваме
    //     document.getElementById("create-form").style.display = "none";      // скривам криейт формата
    //     document.getElementById("edit-form").style.display = "block";       // и показвам едит формата с книгата за едитване
    //     try {
    //         const singleBook = await get("appdata", `books/${id}`)  // окончанието на url-а с id-то на книгата, връща обект

    //         const $id = html.getEditId();           // взимаме си референциите към HTML обектите
    //         const $title = html.getEditTitle();
    //         const $author = html.getEditAuthor();
    //         const $isbn = html.getEditIsbn();

    //         $title.value = singleBook.title;       // подаваме в полетата данните от върнатия обект
    //         $author.value = singleBook.author;
    //         $isbn.value = singleBook.isbn;
    //         $id.value = singleBook._id;           // във върнатия от кинви обект пропъртито е _id
    //     } catch (error) {
    //         console.log(error);
    //         alert(error)
    //     }
    // },

    // "edit-book-post": async function () {          // за събмитване на променената форма
    //     const $id = html.getEditId();              // взимам отново референциите
    //     const $title = html.getEditTitle();
    //     const $author = html.getEditAuthor();
    //     const $isbn = html.getEditIsbn();
    //     // потребителят модифицира име / автор / isbn
    //     if ($title !== null && $author !== null && $isbn !== null) {
    //         const data = {                // правим обект data и му подаваме променените данни от edit полетата
    //             title: $title.value,
    //             author: $author.value,
    //             isbn: $isbn.value
    //         }
    //         try {
    //             const modifiedBook = await put("appdata", `books/${$id.value}`, data);  // пращаме обновените данни по id
    //             console.log(modifiedBook);   // за тест, да се види какво се променя
    //             $id.value = "";              // изчистваме всички edit полета
    //             $title.value = "";
    //             $author.value = "";
    //             $isbn.value = "";

    //             actions["load-books"]();    // отонво зарежда списъка с книгите
    //             document.getElementById("edit-form").style.display = "none";
    //             document.getElementById("create-form").style.display = "block";
    //         } catch (error) {
    //             console.log(error);
    //             alert(error);
    //         }
    //     }
    // },
    // "delete-book": async function () {
    //     if (confirm("Are you sure ?")) {        // изскачащ прозорец, връща true(Ok) или false(Cancel)    
    //         const id = this.id;                 // взимам id от b._id
    //         try {
    //             const entitiesDeleted = await del("appdata", `books/${id}`)   // пращам заявка за изтриване по id, връща обект {"count":1}

    //             actions["load-books"]();    // после зареждам списъка с книгите
    //         } catch (error) {
    //             console.log(error);
    //             alert(error)
    //         }
    //     }
    // }
}


function handleEvent(e) {
    console.log(e.target.id);                            // for test purposes
    console.log(actions[e.target.id]);
    if (typeof actions[e.target.id] === "function") {       // ако има съответстваща функция
        e.preventDefault();                                 // ще го бистря защо чупи фетча...
        actions[e.target.id]();                             // извикваме тази функция
    }
}

(function attachEvents() {      // глобален iffe листенер, но за едит и дилийт ще има отделни
    document.addEventListener("click", handleEvent);
}())