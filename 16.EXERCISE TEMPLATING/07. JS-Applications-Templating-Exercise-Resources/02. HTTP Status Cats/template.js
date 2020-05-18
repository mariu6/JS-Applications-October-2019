// function display(id) {                                                // върви с onclick="display({{id}})"
//     // document.getElementById(id).style.display = document.getElementById(id).style.display === "none" ? "inline" : "none"; // лесния начин
//     if ( document.getElementById(id).style.display === "none") {
//         document.getElementById(id).previousElementSibling.innerText = "Hide status code";
//         document.getElementById(id).style.display = "inline";
//     }else {
//         document.getElementById(id).previousElementSibling.innerText = "Show status code";
//         document.getElementById(id).style.display = "none";
//     }
// }

function toggle(e) {
    // console.log(e);
    e.textContent = e.textContent === "Show status code" ? "Hide status code":  "Show status code"; 
    const statusDiv = e.parentNode.getElementsByClassName("status")[0];                // [0] защото връща масив
    statusDiv.style.display = statusDiv.style.display === "none" ? "inline" : "none";
}


(() => {
    renderCatTemplate();

    async function renderCatTemplate() {
        const source = await fetch("./templates/cats.hbs").then(res => res.text());
        const template = Handlebars.compile(source);
        const context = { cats: window.cats };
        const html = template(context);  
        document.getElementById("allCats").innerHTML = html;
    }

})()
