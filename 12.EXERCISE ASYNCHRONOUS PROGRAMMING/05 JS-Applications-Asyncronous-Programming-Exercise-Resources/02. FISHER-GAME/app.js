function attachEvents() {
   const elements = {
      $catch: {
         $angler: () => document.querySelector('#addForm input.angler'),  // селекция по id и клас
         $weight: () => document.querySelector('#addForm input.weight'),
         $species: () => document.querySelector('#addForm input.species'),
         $location: () => document.querySelector('#addForm input.location'),
         $bait: () => document.querySelector('#addForm input.bait'),
         $captureTime: () => document.querySelector('#addForm input.captureTime'),
      },
      $addBtn: () => document.querySelector('#addForm button.add'),
      $loadBtn: () => document.querySelector('aside button.load'),
      $catches: () => document.getElementById('catches'),
      $exampleCatch: () => document.querySelector('div.catch'),

   };
   const copyTemplate = elements.$exampleCatch().cloneNode(true); // клонирам го

   elements.$addBtn().addEventListener("click", addCatch);     // onClick - add data from input form
   elements.$loadBtn().addEventListener("click", loadCatches);

   function updateCatch(id) {
      const angler = document.querySelector(`#catches [data-id="${id}"] input.angler`).value;
      const weight = document.querySelector(`#catches [data-id="${id}"] input.weight`).value;
      const species = document.querySelector(`#catches [data-id="${id}"] input.species`).value;
      const location = document.querySelector(`#catches [data-id="${id}"] input.location`).value;
      const bait = document.querySelector(`#catches [data-id="${id}"] input.bait`).value;
      const captureTime = document.querySelector(`#catches [data-id="${id}"] input.captureTime`).value;

      catches.put({ angler, weight, species, location, bait, captureTime },id)
         .then((data) => console.log(data))
         .catch((error) => console.log(error))

   }


   function addCatch() {
      const angler = elements.$catch.$angler().value;
      const weight = elements.$catch.$weight().value;
      const species = elements.$catch.$species().value;
      const location = elements.$catch.$location().value;
      const bait = elements.$catch.$bait().value;
      const captureTime = elements.$catch.$captureTime().value;

      catches.post({ angler, weight, species, location, bait, captureTime })
         .then((data) => console.log(data))
         .then(loadCatches())                  // to be set sync/await
         .catch((error) => console.log(error))

   }


   function loadCatches() {                             // функция за показване на всички елементи
      elements.$catches().innerHTML = "";               // първо се изчиства Catches полето

      catches.get()                                     // извиква се функция get за обектите от базата данни
         .then(showAllCatches)                          // извиква се функция за визуализиране на данните
         .catch((error) => console.log(error))          // съобщение в случай на грешка

      function showAllCatches(allCatches) {             // функция за визуализиране на данните
         Object.keys(allCatches).forEach((id) => {      // взимат се обектите на обекта данни по id (което е пропърти) 
            console.log(id);                            //  
            let copy = copyTemplate.cloneNode(true);
            console.log(copy);
            copy.setAttribute('data-id', id); //ID
            console.log(copy);


            Object.keys(elements.$catch)
               .map((c) => c.slice(1)) // почистваме $елементите от $
               .forEach((key) => {     // итерираме през всеки елемент от копието и заменяме стойността му 
                  copy.querySelector(`input.${key}`).value = allCatches[id][key];
               });


            elements.$catches().appendChild(copy);
         });

         [...document.querySelectorAll("button.delete")].forEach((b) => b.addEventListener("click", (e) => {
            const id = e.currentTarget.parentNode.getAttribute("data-id");
            catches.del(id)
               .catch(console.error)
            setTimeout(() => loadCatches(), 500)
         }));

         [...document.querySelectorAll("button.update")].forEach((b) => b.addEventListener("click", (e) => {
            const id = e.currentTarget.parentNode.getAttribute("data-id");
            console.log(id);
            updateCatch(id)
               // .then(loadCatches())
               // .catch(console.error)
            setTimeout(() => loadCatches(), 500)
         }));
         // elements.$exampleCatch().remove();
      }
   }


}

attachEvents();

//  console.log(document.querySelector("div.catch"))           // взима div със клас catch и всичко в него
// const exampleCatch = document.querySelector("div.catch");   // създавам променлива
// const copy = exampleCatch.cloneNode(true);                  // копирам, като true вима всичко в него, deep copy
// document.getElementById("catches").appendChild(copy);       // display-ва копирания html 