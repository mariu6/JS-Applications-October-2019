function solve() {
    const info = document.getElementsByClassName('info')[0];
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');
    let currentId = 'depot';
    let currentName;

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
            .then((res) => res.json())
            .then(departData)
            .catch(errorHandler);
    }

    function arrive() {
        info.textContent = `Arraving at ${currentName}`;
        btnDepart.disabled = false;
        btnArrive.disabled = true;
    }

    function departData(data) {
        const { name, next } = data;
        currentId = next;
        currentName = name;
        btnDepart.disabled = true;
        btnArrive.disabled = false;
        info.textContent = `Next stop ${name}`;
    }

    function errorHandler(err) {
        info.textContent = 'Error';
                btnDepart.disabled = true;
                btnArrive.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();