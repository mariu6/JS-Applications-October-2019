
function getInfo() {
    const stopIdInput = document.getElementById("stopId");
    const stopNameDiv = document.getElementById("stopName");
    const busContainer = document.getElementById("buses");
    
    const busesUrl = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json`;
    busContainer.innerHTML = "";
    stopNameDiv.innerHTML = "";

    fetch(busesUrl)
    .then(res => {
        if (!res.ok && res.status >= 500) {     // проверка за валидност на данните, която обработва и хендълнати от сървъра грешки
            throw new Error(`${res.status} | ${res.statusText}`)
        }
        return res;
    })
    .then(response => response.json())   //задължително е първи then(в случая - след проверката за валидност), за да конвертира стрийма към искания тип данни.
        .then(handleSuccess)             // обработване на получените данни в отделна функция. Всеки .then връща в нов promise 
        .catch((err) => {
            stopNameDiv.textContent = "Error";
        })
    // console.log("Hello!");  // Първо връща 'Hello!', а 'The data arrived!'- когато я получи
    
    function handleSuccess(data) {
        const { name, buses } = data;  // деструктурирам в обект, като buses също е обект
        stopNameDiv.textContent = name;
        Object.entries(buses).forEach(([busId, busTime]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;
            busContainer.appendChild(li);
        });
        // console.log(data);   // проверка - какво се получава
        // console.log("The data arrived!")   // в конзолата на браузъра
    }
}


