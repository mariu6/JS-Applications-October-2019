function attachEvents() {
    const btnLoad = document.getElementById("btnLoad");
    const btnCreate = document.getElementById("btnCreate");
    let phonebook = document.getElementById("phonebook");
    const personEl = document.getElementById("person");
    const phoneEl = document.getElementById("phone");

    btnCreate.addEventListener("click", create);
    btnLoad.addEventListener("click", load);

    function load() {
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(res => res.json())
            .then(data => {
                phonebook.innerHTML = '';
                Object.entries(data)
                    .forEach(([elemId, phoneData]) => {
                        const {
                            person,
                            phone
                        } = phoneData;
                        const li = document.createElement('li');
                        li.textContent = `${person}: ${phone}`;
                        const deleteBtn = document.createElement('button');
                        deleteBtn.setAttribute('data-target', elemId);
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.addEventListener('click', deleteContact);

                        li.appendChild(deleteBtn);
                        phonebook.appendChild(li);
                    });


            })
            .catch(err => {
                console.log("Error");
            });
    }

    function create() {
        const person = personEl.value;
        const phone = phoneEl.value;

        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                person,
                phone
            }),
        };

        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', header)
            .then(res => res.json())
            .then(() => {
                personEl.value = '';
                phoneEl.value = '';
                load();
            })
            .catch(err => {
                console.log("Error");
            });

    }

    function deleteContact(e) {
        const idEl = this.getAttribute('data-target');
        const header = {
            method: 'Delete'
        };

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${idEl}.json`, header)
            .then(() => {
                phonebook.innerHTML = '';
                load();
            })
            .catch(err => {
                console.log("Error");
            });
    }


}

attachEvents();