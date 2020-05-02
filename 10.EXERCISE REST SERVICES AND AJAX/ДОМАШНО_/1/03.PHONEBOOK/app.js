function attachEvents() {
    const createBtn = document.getElementById('btnCreate');
    const loadBtn = document.getElementById('btnLoad');
    const phonebookUl = document.getElementById('phonebook');

    createBtn.addEventListener('click', createIt);
    loadBtn.addEventListener('click', loadIt);

    const dataUrl = `https://phonebook-nakov.firebaseio.com/phonebook.json`;
    let inputName = document.getElementById('person');
    let inputPhone = document.getElementById('phone');

    function createIt() {
        const person = inputName.value;
        const phone = inputPhone.value;

        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        };

        if (person !== '' && phone !== '') {
            fetch(dataUrl, headers)
                .then(() => loadIt())
                .catch(err => console.log(err))
        }
    };

    function loadIt() {
        fetch(dataUrl)
            .then(data => data.json())
            .then(data => displayData(data))
            .catch(err => console.log(err));
    };

    function displayData(data) {
        inputName.textContent = '';
        inputPhone.textContent = '';
        phonebookUl.innerHTML = '';
        Object.entries(data).map(([id, pInfo]) => {
            let btn = document.createElement('button');
            btn.deleteId = id;
            btn.textContent = 'Delete';
            btn.className = 'button';
            btn.addEventListener('click', deleteIt);

            let li = document.createElement('li');
            li.textContent = `${pInfo.person}: ${pInfo.phone}`;
            li.appendChild(btn);
            phonebookUl.appendChild(li);
        });
    };

    function deleteIt() {
        const deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${this.deleteId}.json`;
        const headers = { method: 'DELETE' };
        fetch(deleteUrl, headers)
            .then(() => loadIt())
            .catch(err => console.log(err));
    }
}

attachEvents();