function attachEvents() {
    const authorEl = document.getElementById('author');
    const contentEl = document.getElementById('content');
    const textArea = document.getElementById('messages');
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', submit);
    refreshBtn.addEventListener('click', refresh);

    function refresh() {
        fetch('https://rest-messanger.firebaseio.com/messanger.json')
            .then(res => res.json())
            .then(data => {
                const allMsn = [];
                Object.entries(data)
                    .forEach(([id, obj]) => {
                        const {
                            author,
                            content
                        } = obj;
                        allMsn.push(`${author}:${content}`);
                    });

                textArea.textContent = allMsn.join('\n');

            });
    }

    function submit() {
        const author = authorEl.value;
        const content = contentEl.value;

        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            }),
        };

        fetch('https://rest-messanger.firebaseio.com/messanger.json', header)
            .then(res => res.json())
            .then(data => {
                document.getElementById('author').value = '';
                document.getElementById('content').value = '';
            })
            .catch(err => {
                console.log('Error');
            });
    }
}

attachEvents();