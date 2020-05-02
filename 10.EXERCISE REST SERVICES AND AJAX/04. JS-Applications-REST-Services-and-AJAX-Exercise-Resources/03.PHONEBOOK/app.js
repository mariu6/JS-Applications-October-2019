function attachEvents() {
    const phonebookContainer = document.getElementById("phonebook");
    const personInput = document.getElementById("person");
    const phoneInput = document.getElementById("phone");

    function loadPhonebook() {
        phonebookContainer.innerHTML = "";        // за изчистване на div-а phonebook преди рендериране на списъка
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(res => res.json())
            .then(data => {                       // data е обект с hash-id ключове и стойности - обекти {person:име, phone:номер}
                Object.entries(data).forEach(([elId, phonebookData]) => {   // взимаме всеки обект и си правим тюпъли [id, {data}]
                    const { phone, person } = phonebookData;                // правим си тюпъл [телефон,име]. Не знам защо са разменени

                    const li = document.createElement("li");                // генерираме li
                    li.textContent = `${person}: ${phone} `;                 // слагаме му текст

                    const deleteBtn = document.createElement("button");     // генерираме бутон, който ще изтрива ентрито
                    deleteBtn.setAttribute("data-target", elId);            // слагаме му атрибут за таргетиране 
                    deleteBtn.addEventListener('click', deletePhonebook);   // закачаме му addEventListener
                    deleteBtn.textContent = "Delete";                       // слагаме му текст 

                    li.appendChild(deleteBtn);                              // рендерираме Delete
                    phonebookContainer.appendChild(li)                      // рендерираме list item-a
                });

            })
            .catch(handleError);
    }

    function createPhonebook() {
    // function createPhonebook(e) {         // В случай че данните се подават чрез инпут форма, изчистването на полетата щеше да е автоматично
    //     e.preventDefault();               // записът е такъв, а надолу всичко е същото
        const person = personInput.value;       
        const phone = phoneInput.value;

        const headers = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },   // има и други вдове хедъри, които могат да се пратят
            body: JSON.stringify({ person, phone })            // не е директно обект, трябва да е JSON стрингифайнат
        }

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, headers)  // съшия url, но има хедъри
            .then((response) => response.json())        // отговор на заявката; в този случай не е необходим, но не пречи на функцията
            .then((data) => {                           // при успешна заявка се чистят полетата. (data) може да се остави празни скоби
                phonebookContainer.innerHTML = "";      // списъка phonebook
                personInput.value = "";                 // инпут поле за име
                phoneInput.value = "";                  // инпут поле за телефон. Зачистването би могло да се отдели във функция.

                loadPhonebook();                 // зарежда отново списъка
            })
            .catch(handleError);                 // изваден е в отделна функция  
    };

    function deletePhonebook() {
        const phonebookId = this.getAttribute("data-target");   // this е кликнатия елемент; 
        const headers = {                                       // името на атрибута 'data-target' беше избрано произволно от Кирил
            method: "DELETE"                // хедърс, боди не му трябват, защото се изтрива. 
        }
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${phonebookId}.json`, headers)  // трябва да сложим id на елемента
            // .then((res) => res.json())     // респонс не търсим също, защото е null 
            .then(() => {
                phonebookContainer.innerHTML = "";
                loadPhonebook();
            })
            .catch(handleError);
    }

    function handleError(err) {
        throw new Error(console.error);
    }


    return {
        loadPhonebook,
        createPhonebook
    }
}

let result = attachEvents();
