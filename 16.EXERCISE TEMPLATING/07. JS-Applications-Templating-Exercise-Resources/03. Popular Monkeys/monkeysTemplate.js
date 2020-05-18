function eventHandler(event) {
    if (event.target.tagName === "BUTTON") {
        event.target.parentNode.childNodes[7].style.display = event.target.parentNode.childNodes[7].style.display === "block" ? "none" : "block";
    }
}

window.addEventListener('DOMContentLoaded', ((e) => {
    const source = document.getElementById("monkey-template").innerHTML;
    const template = Handlebars.compile(source);
    const html = template({ monkeys });
    document.getElementsByClassName("monkeys")[0].innerHTML = html;
}))
document.addEventListener("click", eventHandler);