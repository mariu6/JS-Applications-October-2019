export function weather() {
    const baseURL = "https://judgetests.firebaseio.com";

    return {      // използвам като основа базовия URL                        return обект със съответните данни  
        locations: () => fetch(baseURL + `/locations.json`).then(res => res.json()),  // първично сериализиране на стрийма с всички локации. Масив от обекти
        today: (code) => fetch(baseURL + `/forecast/today/${code}.json`).then(res => res.json()),  // code ще ми идва динамично от обекта за съответната локация
        upcoming: (code) => fetch(baseURL + `/forecast/upcoming/${code}.json`).then(res => res.json())
    }  // return обект със съответните данни 
};  