const app_state = { count: 0 };                 // само брояч в момента. Но може да ми помогне да възстановя състоянието на приложението.
const app_root = "http://localhost:8000";

const routesParams = {};                        // да ми направи мапинг към параметрите на пътищата  виж най-отдолу коментарите

const routes = {};                              // да ми запази пътищата 

function Page1(page, temp) {                    // сменят тайтъла и инджекват съдържание. 
    document.querySelector("title").innerHTML = "Page1";
    document.all.content.innerHTML = `Link <b>1</b> was pressed => page: ${page} | temp: ${temp}`;
}
function Page2() {      
    document.querySelector("title").innerHTML = "Page2";
    document.all.content.innerHTML = `Link <b>2</b>!`;
}
function Page2_1() {      
    document.querySelector("title").innerHTML = "Page2.1.";
    document.all.content.innerHTML = `Link <b>2.1.!</b>`;
}

function createPath(path, callback) {               // приема пътя и функцията, която ще извика
    const processedPath = path.split(":");           // разделяне на пътя от параметрите по някакъв разделител ':'
    const realPath = processedPath.splice(0,1);     
     routes[realPath] = callback;                   // взимам пътя(/link1) и закачам колбека (page1)
     routesParams[realPath] = processedPath;        // закчачам линка (/link1)  с неговите възможни параметри page и temporary
}

createPath(`/link1:page:temp`, Page1);      // създай път, 
createPath(`/link2`, Page2);
createPath(`/link2/sublink1`, Page2_1);

function clickHandler(e) {                              // при клик 
    if (e.target.dataset.myLink === "1") {              // проверяваме дали е кликнат наш линк или външен
        e.preventDefault();                             // за да не презарежда страницата, ако не е външен линк 
        router(e.target.href);
    }
}


document.addEventListener("click", clickHandler);

window.addEventListener("popstate", function (e) {      // проверка дали ходим напред(false) или назад(true) в приложението 
    router(location.href,true);
});
window.addEventListener("load", function (e) {          // при първоначално зареждане да намерим къде сме и коя страница да активираме
    router(location.href)
});


function router(href, isBackButtonPressed) {
    if (!isBackButtonPressed) {   // ако ходим назад да не презаписва стейта, иначе влизаме в лууп на едно място
        history.pushState({ clickCounter: app_state.count++ }, "", href); // като кликнем на наш линк, да сменя пътя в адресното поле
    }
    const q = [...new URLSearchParams(location.search).entries()] // ще върне масив от тюпъли. Те трябва да се сортират, за да се запази реда им в URLa!
        .filter(x => routesParams[location.pathname].indexOf(x[0]) > -1) // проверка дали има такива в куерито на линка
        .map(x => x[1]); // взимам само стойностите  
    if (typeof routes[location.pathname] === "function") { // ако този път(линк) съществува, тогава
        routes[location.pathname](...q);                    // отиваме на него
    } else {
        document.all.content.innerHTML = "404 NOT FOUND!"    // или изписваме грешка
    }
}

 
// const routesParams = {
//     // "/link1": ["page", "temp"]        // ДА СЕ СПАЗВА СЪЩИЯ РЕД КАТО ВЪВ ФУНКЦИЯТА
// }

// const routes = {
//     // "/link1": (page, temp) => {       // пропъртита - функции се извикват с (), напр.: routes["/link1"]()
//     //     document.all.content.innerHTML = `Link <b>1</b> was pressed => page: ${page} | temp: ${temp}`;
//     // },
//     // "/link2": () => {
//     //     document.all.content.innerHTML = "Link <b>2</b> was pressed!";
//     // }
// }

// location.pathname - браузър обект с много хубави пропъртита ;)

        // const route = e.target.href                     // за да намерим пътя,  - взимаме стойността на href от кликнатия таг и
        //     .replace(app_root,"")                       // го изчистваме от руут частта на URL (браузъра взима не само href, но си прави целия път)


 // window[       // не се препоръчва, вместо това ще се използва обекта routes
        //     e.target.href.replace(app_root, "")     // махам първата част от URL-а
        //     .replace("/","")    // с replace махам '/' от href="/link1"
        // ](); 



// var q = new URLSearchParams(location.search)
// q.get("page")    // "2"
// [...q.entries()]  // връща масив[от тюпъли [ключ,стойност],[kl,st],[kl,st]]

 //02:10