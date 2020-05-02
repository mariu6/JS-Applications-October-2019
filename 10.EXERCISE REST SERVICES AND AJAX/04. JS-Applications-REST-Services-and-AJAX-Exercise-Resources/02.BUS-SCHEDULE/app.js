function solve() {
    // infoSpan, departBtn, arriveBtn, currentId и currentName се инициализират в closure
    const infoSpan = document.getElementsByClassName('info')[0];   // HTMLCollection [span.info] - getElementS връща масив, в случая с един елемент [0]
    // const infoSpan = document.querySelector("#info > span")     // алтернативно с куери-селектор
    const departBtn = document.getElementById("depart");           // променливи за бутоните "depart"
    const arriveBtn = document.getElementById("arrive");           // и "arrive" 

    let currentId = "depot";                                // id на спирките(номера), като първата е "depot" и я пре-дефинираме
    let currentName;                                        // имена на спирките; id и имената ги получавам от data

    function depart() {                 // функцията се извиква при натискане на бутона Depart 
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)   // взимаме данните по id, от сървъра
            .then(handelError)                                                  // проверка за валидност на стрийма 
            .then(res => res.json())                                            // сериализиране по json
            .then(departSuccess)                                                // обработваме ивента в отделна функция
            .catch(err => {
                // infoSpan.textContent = "Wrong stop Id!";
            })
    }

    function arrive() {                  // функцията се извиква при натискане на бутона Arrive
        infoSpan.textContent = `Arriving at ${currentName}`;     // променяме текста в инфо-спана на новата спирка
        departBtn.disabled = false;             // обръщаме блокировката на бутоните
        arriveBtn.disabled = true;
    }

    function departSuccess(data) {      // обработваме ивента Depart
        const { name, next } = data;    // деструктурираме данните
        currentId = next;               // задаваме новите данни за номер на спирка, за следващата итерация
        currentName = name;             // задаваме име на следващата спирка, за да бъде показана в спана
        departBtn.disabled = true;      // Depart бутонът става неактивен
        arriveBtn.disabled = false;     // Arrive става активен
        infoSpan.textContent = `Next stop ${currentName}`;   // изписваме име на следващата спирка, може и с .innerHTML

    }

    function handelError(res) {      // друг вариант за хендълване на грешки
        if (!res.ok) {               // ok property can be true (200 / other good data) or false
            console.log(res);        // логваме какво е получено
            infoSpan.textContent = "Wrong something went!";  // изписваме в инфо-спана: грешка
            throw new Error("Concerned master Yoda is!");     // Можем да го пропуснем, но togawa трябва да има return
            // return;                  // Много важно! Иначе просто преминава натам и се получава undefined вместо име на спирка...
        }
        return res;  // ако не върнем res ще счупим then чейна
    }

    return {
        depart,
        arrive
    };
}

let result = solve();        

