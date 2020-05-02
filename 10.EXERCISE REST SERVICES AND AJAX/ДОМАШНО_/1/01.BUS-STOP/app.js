function getInfo() {
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busContainer = document.getElementById('buses');

    let url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`

    let errNum = '';
    busContainer.textContent = '';
    stopId.value = '';
    fetch(url)
        .then(data => {
            if (data.ok === false) {
                errNum = `${data.status} (${data.statusText})`
            } else {
                return data.json();
            }
        })
        .then(({ name, buses }) => {
            stopName.textContent = name;
            Object.entries(buses)
                .forEach(([busId, time]) => appender(`Bus ${busId} arrives in ${time} minutes`))
            busContainer.addEventListener('click', sortIt)
        })
        .catch(_ => stopName.textContent = `Error - ${errNum}`)

    function sortIt() {
        let arr = Array.from(busContainer.children);
        arr.sort((a, b) => {
            let aMin = a.textContent.match(/\d+/gi);
            let bMin = b.textContent.match(/\d+/gi);

            return aMin[1] - bMin[1] || aMin[0] - bMin[0];
        })
        busContainer.textContent = '';
        arr.map(el => appender(el.textContent))
    }
    function appender(text) {
        let li = document.createElement('li');
        li.textContent = text;
        busContainer.appendChild(li);
    }
}