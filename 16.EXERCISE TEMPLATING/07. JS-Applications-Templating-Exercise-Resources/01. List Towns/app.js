
(function () {     
    document.getElementById("btnLoadTowns").addEventListener("click", async function () {
        const towns = document.getElementById("towns").value.split(", ");
        const sourceTemplate =  await fetch("./towns.hbs").then(x => x.text());
        const template = Handlebars.compile(sourceTemplate);
        const contextObject = {towns};
        const html = template(contextObject);
        document.getElementById("root").innerHTML = html;
    });
}());
