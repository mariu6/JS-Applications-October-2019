function solve() {
    let infoContainer = document.getElementById('info');
    let departBtn = document.getElementById('depart')
    let arriveBtn = document.getElementById('arrive')
    let currentId = 'depot';
    function depart() {
        let stUrl = `https://judgetests.firebaseio.com/schedule/${currentId}.json`
        fetch(stUrl)
            .then(data => data.json())
            .then(({ name, next }) => handler(name, next, 'Next stop', true, false))
            .catch(_ => console.log('Error'))
    }

    function arrive() {
        let stUrl = `https://judgetests.firebaseio.com/schedule/${currentId}.json`
        fetch(stUrl)
            .then(data => data.json())
            .then(({ name, next }) => handler(name, next, 'Arriving at', false, true))
            .catch(_ => console.log('Error'))
    }

    function handler(name, next, infoText, depBtn, arrBtn) {
        currentId = next;
        infoContainer.textContent = `${infoText} ${name}`;
        departBtn.disabled = depBtn;
        arriveBtn.disabled = arrBtn;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();