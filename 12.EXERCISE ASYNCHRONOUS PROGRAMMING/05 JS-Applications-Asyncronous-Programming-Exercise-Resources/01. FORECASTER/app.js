
import { weather } from './fetch.js';    // импортиране на файла с фетча


const elements = {   // Холдър-обект за всички дом елементи, които ще използвам                          
    // $location: document.getElementsByClassName("location"), // така създавам референция към дом обекта с id location. Не е добър вариант, когато са много референции
    $location: () => document.getElementById("location"), // така ще се създава референция само при извикване, за да не пазим много референции
    $submit: () => document.getElementById("submit"),
    $current: () => document.getElementById("current"),  // див елементът, на който да закачим нашите елементи
    $upcoming: () => document.getElementById("upcoming"), 
    $forecast: () => document.getElementById("forecast"),
    $content: () => document.getElementById("content")
}

const weatherSymbols = {  // обект за всички символи за времето
    sunny: "☀",          // копирах направо символите от условието, макар че и с кодовете(&#x26C5; // ⛅) ще стане
    partlysunny: "⛅",   // всичко е lowerCase, за да мога после по-лесно да го мачна с името от данните
    overcast: "☁",
    rain: "☂",
    degrees: "°"
};


function attachEvents() {       // main function
   console.log(getData.data);
    elements.$submit().addEventListener("click", getWeatherInfo);        // elements - обект, $submit() - пропърти- Л-функция
    function getWeatherInfo() {                            // фукцията е закачена към бутона submit в момента  
        const location = elements.$location().value;       // взимам локацията от инпут текст полето
        weather().locations()
            .then((locations) => {
                const { code, name } = locations.find((obj) => obj.name === location);  // сравнявам инпута от полето с .name на кой обект съвпада

                return Promise.all([// Promise.all() - функция, която приема масив от промиси и връща масив от респонси, когато се разрешат всички промиси
                    weather().today(code),          //  {forecast: {…}, name: "Barcelona, Spain"}  връща обект {forecat:{обект}, име: 'град, държава'}
                    weather().upcoming(code)        //  {forecast: Array(3), name: "Barcelona"}  връща обект с {форкаст:масив  и име:град}
                ])
            })
            .then(([today, upcoming]) => {          // с резултата от Promise.all()
                generateWeatherInfo(today, upcoming);         //  визуализираме HTML
                // console.log(today, upcoming);

            })
            .catch((e) => {
                const $error = createHTMLElement("h1", [], "ERROR");
                elements.$content().appendChild($error);
            })
    }



    function generateWeatherInfo(today, upcoming) {
        elements.$forecast().style.display = "block";
        const { condition, low, high } = today.forecast;  //forecast е пропърти-обект в обекта today
        const { name } = today;
        const symbol = getNormalizedSymbol(condition)  // за да направи малки букви и да премахне интервалите(ако има, напр. Partly Cloudy = partlycloudy)

        const $divForecastsWrapper = createHTMLElement("div", ["forecasts"]);           // създаваме елементите от най-външния към най-вътрешния
        const $spanSymbol = createHTMLElement("span", ["condition", "symbol"], weatherSymbols[symbol])
        const $spanWrrapper = createHTMLElement("span", ["condition"]);

        const $spanName = createHTMLElement("span", ["forecast-data"], name);
        const $spanDegrees = createHTMLElement("span", ["forecast-data"], `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`);
        const $spanCondition = createHTMLElement("span", ["forecast-data"], condition);

        $spanWrrapper.append($spanName, $spanDegrees, $spanCondition);          // дисплейваме елементите от най-вътрешния към най-външния
        $divForecastsWrapper.append($spanSymbol, $spanWrrapper);
        elements.$current().appendChild($divForecastsWrapper);

        generateUpcomingWeatherInfo(upcoming);
    }

    function generateUpcomingWeatherInfo(upcoming) {
        const $divWrapper = createHTMLElement("div", ["forecasts-info"]);   // това е опаковащия, така че ни трябва само веднъж

        upcoming.forecast.forEach((o) => { 
            const { condition, low, high } = o;
            const symbol = getNormalizedSymbol(o.condition)
            const $spanUpcoming = createHTMLElement("span", ["upcoming"]);
            const $spanSymbol = createHTMLElement("span", ["symbol"], weatherSymbols[symbol])
            const $spanDegrees = createHTMLElement("span", ["forecast-data"], `${low}${weatherSymbols.degrees}/${high}${weatherSymbols.degrees}`);
            const $spanCondition = createHTMLElement("span", ["forecast-data"], condition);

            $spanUpcoming.append($spanSymbol, $spanDegrees, $spanCondition);          
            $divWrapper.appendChild($spanUpcoming);
        })
        elements.$upcoming().appendChild($divWrapper);
        
    }

    function getNormalizedSymbol(symbol) {
        return symbol.split("").filter((c) => c !== " ").map((c) => c.toLowerCase()).join("");
        // split("") - за да може да вземе всяка буква, да премахне интервалите, да смали буквите и да ги събере отново с join("")
    }

    /**             // Анотация за очакваните типове данни във функцията
     * 
     * @param {String} tagName 
     * @param {Array} classNames 
     * @param {String} textContent 
     */
    function createHTMLElement(tagName, classNames, textContent) {   // функция за DOM елементи.    Да си я извадя във файл за изпита? Мога да си добавя и id...

        const element = document.createElement(tagName);

        if (classNames) {           // Класове може да има повече от един ("condition symbol" са два елемента)
            element.classList.add(...classNames);   // .classList() e oт API нa document
        }

        if (textContent) {
            element.textContent = textContent;
        }
        return element;
    }

}

attachEvents();


// да се слага $ когато съдържа елемент от DOM дървото

//  {
//     "forecast": {
//         "condition": "Rain",
//         "high": "8",
//         "low": "2"
//     },
//     "name": "London, UK"
// }

// {
//     "forecast": [
//         {
//             "condition": "Rain",
//             "high": "8",
//             "low": "6"
//         },
//         {
//             "condition": "Rain",
//             "high": "11",
//             "low": "3"
//         },
//         {
//             "condition": "Rain",
//             "high": "8",
//             "low": "5"
//         }
//     ],
//     "name": "London"
// }
