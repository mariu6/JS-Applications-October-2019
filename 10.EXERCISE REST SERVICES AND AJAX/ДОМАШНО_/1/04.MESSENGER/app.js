function attachEvents() {
    let domElements = {
        $sendBtn: document.getElementById('submit'),
        $refreshBtn: document.getElementById('refresh'),
        $controls: document.getElementById('controls'),
        $messages: document.getElementById('messages'),
        $author: document.getElementById('author'),
        $content: document.getElementById('content'),
        $deleteBtn: document.getElementById('delete')
    }

    const url = `https://rest-messanger.firebaseio.com/messanger.json`;
    let lastId = '';

    domElements.$sendBtn.addEventListener('click', sendIt);
    domElements.$refreshBtn.addEventListener('click', refreshIt);
    domElements.$deleteBtn.addEventListener('click', deleteLast);

    function sendIt() {
        const author = domElements.$author.value;
        const content = domElements.$content.value;

        if (author !== '' && content !== '') {
            const headers = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, content })
            };
            fetch(url, headers)
                .then(clearFields())
                .then(refreshIt)
        }
    }

    function refreshIt() {
        fetch(url)
            .then(clearFields())
            .then(data => data.json())
            .then(data => {
                Object.entries(data)
                    .map(([id, msg]) => {
                        lastId = id;
                        domElements.$messages.textContent += `${msg.author}: ${msg.content}\n`
                    })
            })
    }

    function deleteLast() {
        fetch(`https://rest-messanger.firebaseio.com/messanger/${lastId}.json`, { method: 'DELETE' })
            .then(refreshIt)
    }

    function clearFields() {
        domElements.$author.value = '';
        domElements.$content.value = '';
        domElements.$messages.textContent = '';
    }
}

attachEvents();