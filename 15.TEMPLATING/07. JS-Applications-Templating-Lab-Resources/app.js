import { contacts } from "./contacts.js";


const HB = window.Handlebars;

async function main() {
    const contactCard = await fetch("./contact-card.hbs").then(x => x.text());
    const contactCards = await fetch("./contact-cards.hbs").then(x => x.text());

    HB.registerPartial("contact", contactCard)
    // const singleContact = HB.compile(contactCard);
    const allContacts = HB.compile(contactCards);
    console.log(allContacts({ contacts }));
    document.body.insertAdjacentHTML("beforeend", allContacts({ contacts }));  // beforeend - преди </body>

    document.addEventListener("click", function (e) {
        if(e.target.tagName == "BUTTON") {
           let c = document.getElementById(`contact_${e.target.dataset.id}`);
            c.style.display =  c.style.display === "block"?  "none": "block";
        }
    })
}

main();



/*
let template = Handlebars.compile('<h1>Hello {{name}}</h1>');
let container = document.getElementById('app');
container.innerHTML = template({ name: 'Handlebars' });
*/ 
