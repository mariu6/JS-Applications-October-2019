// function getArticleGenerator(articles) {
//     // console.log(articles)
//     // let a = document.querySelector("body > script:nth-child(3)").innerText.match(/".*"/gim);  // вадя масива от хтмл-а
//     // a = a.map(x => x.split("\"")).map(x => x[1]);   // тримвам го от кавичките
//     // console.log(a);
//     let i = 0;
//     return function () {
//         if(i < articles.length) {
//             let article = document.createElement("article");
//             article.innerText = articles[i];
//             document.getElementById("content").appendChild(article);
//             i++;
//         }
//     }
// }


function getArticleGenerator(articles) {
    // let i = articles.slice(0);
    
    return function () {
        if (articles.length > 0) {                                         // докато има елементи в масива
            let article = document.createElement("article");            // да се създава елемент артикъл
            article.innerText = articles.shift();                       // да му се подава текст - елемент от масива    
            document.getElementById("content").appendChild(article);    // да се дисплейне 
        }
    }
}
