function attachEvents() {
    const authorField = document.getElementById("author");
    const contentField = document.getElementById("content");
    const send = document.getElementById("submit");
    const refresh = document.getElementById("refresh");
    const field = document.getElementById("messages");
    let fieldData = "";

    document.addEventListener("click", function (e) {
        if (e.target === send) {
           postData();
           setTimeout(getData, 1000);
        }
        if (e.target === refresh) {
            getData();
        }
    })
    function postData() {
        let author = authorField.value;
        let content = contentField.value;
        const headers = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },   
            body: JSON.stringify({ author, content })            
        }
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`, headers)
        .then((data) => {
            authorField.value = "";
            contentField.value = "";
        })
        .catch(console.error)
    }

    function getData() {
        field.innerHTML = "";
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(([elId, messageData]) => {
                    const { author, content } = messageData;
                    fieldData += `${author}: ${content}<br />`;
                    // fieldData += `${author}: ${content}&#13;&#10;`;
                })
                field.innerHTML = fieldData;
            })
            .catch(console.error)
        return {
            getData, 
            postData
        }
    }
}
attachEvents();