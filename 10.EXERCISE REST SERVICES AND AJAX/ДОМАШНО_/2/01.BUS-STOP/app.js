function getInfo() {
    const stopId = document.getElementById('stopId');
    const stopName = document.getElementById('stopName');
    const busesContainer = document.getElementById('buses');
    const url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;

    stopName.textContent = '';
    busesContainer.innerHTML = '';

    fetch(url)
        .then(res => res.json())
        .then(handleData)
        .catch(() => {
            stopName.textContent = 'Error';
        });

    function handleData(data) {
        const {
            name,
            buses
        } = data;
        stopName.textContent = name;
        Object.entries(buses)
            .forEach(([busId, busTime]) => {
                const li = document.createElement('li');
                li.textContent = `Bus ${busId} arrives in ${busTime} minutes.`;

                busesContainer.appendChild(li);
            });
    }
}