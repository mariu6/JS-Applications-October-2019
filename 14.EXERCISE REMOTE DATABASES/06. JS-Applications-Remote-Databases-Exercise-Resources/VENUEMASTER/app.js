import { get, post, put, del } from './requester.js';                // внасяме си функциите от requester.js
// върщат ми сериализирани .json() данни
let arrayVenueObjects = [];
async function venuesDisplay(venueObject) {
    arrayVenueObjects.push(venueObject);
    const htmlTemlpate = await fetch("./venue-template.hbs").then(x => x.text());
    let template = Handlebars.compile(htmlTemlpate);
    document.getElementById('venue-info').innerHTML += template(venueObject);
}

async function purchaseDisplay(purchseObject) {
    const htmlTemlpate = await fetch("./confirmation-template.hbs").then(x => x.text());
    let template = Handlebars.compile(htmlTemlpate);
    document.getElementById('venue-info').innerHTML = template(purchseObject);
}

async function handleEvent(e) {
    console.log(e.target);
    if (e.target.id === "getVenues") {
        try {
            document.getElementById('venue-info').innerHTML = "";
            // let date = document.getElementById("venueDate").value;
            let date = "23-11";
            const venues_id = await post("rpc", `custom/calendar?query=${date}`);
            // console.log(venues_id);
            const venues = await venues_id.forEach(id => {
                get("appdata", `venues/${id}`).then(venuesDisplay);
            });
        } catch (error) {
            console.log(error);     // в конзолата получавам повече информация за грешката
            alert(error)
        }
    }
    // console.log(arrayVenueObjects);
    if (e.target.className === "info") {
        let cel = e.target.dataset.id;
        let c = document.getElementById(cel).children[1];
        c.style.display = c.style.display === "block" ? "none" : "block";
    }
    if (e.target.className === "purchase") {
        const id = e.target.getAttribute("data-id");
        const purchaseObject = arrayVenueObjects.find(obj => obj._id = id);

        purchaseObject.total = purchaseObject.price * 1;
        document.getElementById('venue-info').innerHTML = "";
        purchaseDisplay(purchaseObject)
    }
}

(function attachEvents() {      // глобален iffe листенер, но за едит и дилийт ще има отделни
    document.addEventListener("click", handleEvent);
}());



        // let template = Handlebars.compile(`'<h1>Hello {{name}}</h1>'`);   // "компилирам" си шаблона
        // let container = document.getElementById('app');                   // задавам си мястото за деплоймент
        // container.innerHTML = template({ name: 'Handlebars' });           // слагам в мястото компилираната форма





        // function attachEvents() {

        //     let base64Auth = btoa("guest:pass");

        //     document.getElementById('getVenues').addEventListener('click',loadVenues);

        //     function loadVenues() {
        //         let date = document.getElementById('venueDate').value;

        //         fetch(`https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`,{
        //             method:"POST",
        //             headers : {
        //                 "Authorization": "Basic " + base64Auth
        //             }
        //         }).then(res=>res.json()).then(data=>getVenue(data));
        //     }
        //     function getVenue(data){
        //         for (const id of data) {
        //             fetch(`https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/${id}`,{
        //                 method:"GET",
        //                 headers: {
        //                     "Authorization": "Basic " + base64Auth
        //                 }
        //             }).then(res=>res.json()).then(data=>showVenue(data));
        //         }
        //     }
        //     function showVenue(data){
        //       let wrapper=document.createElement('div');
        //       wrapper.setAttribute('class','venue');
        //       wrapper.setAttribute('id',data._id);
        //       //
        //       let span = document.createElement('span');
        //       span.setAttribute('class','venue-name');
        //       span.textContent=data.name;
        //       //
        //       let input=document.createElement('input');
        //       input.setAttribute('class','info');
        //       input.setAttribute('type','button');
        //       input.value="More info";
        //       input.addEventListener('click',showInfo);
        //       //
        //       let div=document.createElement('div');
        //       div.setAttribute('class','venue-details');
        //       div.setAttribute('style','display: none;');
        //       //
        //       let table=document.createElement('table');
        //       //
        //       let tr1=document.createElement('tr');
        //       let thPrice=document.createElement('th');
        //       thPrice.textContent='Ticket Price';
        //       let thQuantity=document.createElement('th');
        //       thQuantity.textContent='Quantity';
        //       let emptyTh=document.createElement('th');
        //       //
        //       let tr2=document.createElement('tr');

        //       let td1=document.createElement('td');
        //       td1.setAttribute('class','venue-price');
        //       td1.textContent=data.price;
        //       let td2=document.createElement('td');
        //       let select=document.createElement('select');
        //       select.setAttribute('class','quantity');

        //       let option1=document.createElement('option');
        //       option1.setAttribute('value','1');
        //       option1.textContent='1';
        //       let option2=document.createElement('option');
        //       option2.setAttribute('value','2');
        //       option2.textContent='2';
        //       let option3=document.createElement('option');
        //       option3.setAttribute('value','3');
        //       option3.textContent='3';
        //       let option4=document.createElement('option');
        //       option4.setAttribute('value','4');
        //       option4.textContent='4';
        //       let option5=document.createElement('option');
        //       option5.setAttribute('value','5');
        //       option5.textContent='5';
        //       //
        //       let td3=document.createElement('td');
        //       let purchaseInput=document.createElement('input');
        //       purchaseInput.setAttribute('class','purchase');
        //       purchaseInput.setAttribute('type','button');
        //       purchaseInput.setAttribute('value','Purchase');
        //       purchaseInput.addEventListener('click',purchase);
        //       //
        //       let headSpan=document.createElement('span');
        //       headSpan.setAttribute('class','head');
        //       headSpan.textContent='Venue description:';
        //       let p1=document.createElement('p');
        //       p1.setAttribute('class','description');
        //       p1.textContent=data.description;
        //       let p2=document.createElement('p');
        //       p2.setAttribute('class','description');
        //       p2.textContent=`Starting time: ${data.startingHour}`


        //       select.appendChild(option1);
        //       select.appendChild(option2);
        //       select.appendChild(option3);
        //       select.appendChild(option4);
        //       select.appendChild(option5);
        //       td2.appendChild(select)
        //       td3.appendChild(purchaseInput)

        //       tr1.appendChild(thPrice);
        //       tr1.appendChild(thQuantity);
        //       tr1.appendChild(emptyTh);

        //       tr2.appendChild(td1);
        //       tr2.appendChild(td2);
        //       tr2.appendChild(td3);

        //       table.appendChild(tr1);
        //       table.appendChild(tr2);
        //       div.appendChild(table);
        //       div.appendChild(headSpan);
        //       div.appendChild(p1);
        //       div.appendChild(p2);

        //       span.appendChild(input);
        //       wrapper.appendChild(span);
        //       wrapper.appendChild(div);

        //       document.getElementById('venue-info').appendChild(wrapper)
        //     }
        //     function showInfo() {
        //         document.getElementsByClassName('venue-details')[0].setAttribute('style','display: none;');
        //         this.parentNode.parentNode.getElementsByClassName('venue-details')[0].setAttribute('style','display: block;');
        //     }
        //     function purchase() {
        //         let id = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
        //         let name = this.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("venue-name")[0].textContent;
        //         let qty = Number(this.parentNode.parentNode.getElementsByClassName("quantity")[0].value);
        //         let price = Number(this.parentNode.parentNode.getElementsByClassName("venue-price")[0].textContent.substring(0, this.parentNode.parentNode.getElementsByClassName("venue-price")[0].textContent.length-1));

        //         let purchaseSpan=document.createElement('span');
        //         purchaseSpan.setAttribute('class','head');
        //         purchaseSpan.textContent='Confirm purchase';
        //         let purchaseDiv=document.createElement('div');
        //         purchaseDiv.setAttribute('class','purchase-info');

        //         let firstSpan=document.createElement('span');
        //         firstSpan.textContent=name;
        //         let secondSpan=document.createElement('span');
        //         secondSpan.textContent=`${qty} x ${price}`;
        //         let thirdSpan=document.createElement('span');
        //         thirdSpan.textContent=`Total: ${qty * price} lv`;
        //         let confirmButton=document.createElement('input');
        //         confirmButton.setAttribute('type','button');
        //         confirmButton.setAttribute('value','Confirm');
        //         confirmButton.addEventListener('click',function(){
        //             result(id,qty);
        //         });

        //         purchaseDiv.appendChild(firstSpan);
        //         purchaseDiv.appendChild(secondSpan);
        //         purchaseDiv.appendChild(thirdSpan);
        //         purchaseDiv.appendChild(confirmButton);
        //         clear();
        //         document.getElementById('venue-info').appendChild(purchaseSpan);
        //         document.getElementById('venue-info').appendChild(purchaseDiv);

        //     }
        //     function clear(){
        //         while(document.getElementById('venue-info').firstChild){
        //             document.getElementById('venue-info').removeChild(document.getElementById('venue-info').firstChild)
        //         }
        //     }
        //     function showTicket(data){
        //         document.getElementById('venue-info').textContent='You may print this page as your ticket';
        //         document.getElementById('venue-info').innerHTML=data.html;
        //     }
        //     function result(id,qty){
        //     fetch(`https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${qty}`,{
        //             method:"POST",
        //             headers: {
        //                 "Authorization": "Basic " + base64Auth
        //             }
        //         }).then(res=>res.json()).then(data=>showTicket(data))

        //     }
        // }
