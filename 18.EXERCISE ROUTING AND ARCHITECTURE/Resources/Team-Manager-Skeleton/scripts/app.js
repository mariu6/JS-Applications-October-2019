import { get, post, put, del } from "../scripts/requester.js";

(() => {                          // започва със самоизвикваща се функция  
    const app = new Sammy("#main", function () {          //  правя Сами метод и указвам контейнера от html-a - <div id="main">

        const partials = {                              // хедър и футър за всяка страница
            header: "./templates/common/header.hbs",
            footer: "./templates/common/footer.hbs"
        }

        // тук дефинираме пътищата, които ще се извикват
        this.use("Handlebars", "hbs");      // зареждаме си хендълбарс

        this.get("#/", loadHome)
        this.get("/index.html", loadHome)
        this.get("#/home", loadHome)      // "#/" e основната; в context ще слагаме всички данни, които ще предаваме на hds файла. 

        this.get("#/about", function (ctx) {         // в about.hbs също има header footer паршъли, затова си зареждам първо тях
            getSessionInfo(ctx);
            this.loadPartials(partials).then(function () {
                this.partial("./templates/about/about.hbs");
            })
        });

        this.get("#/login", function (ctx) {
            getSessionInfo(ctx);
            partials["loginForm"] = "./templates/login/loginForm.hbs";   // добавяме ново пропърти на обекта partials
            this.loadPartials(partials).then(function () {
                this.partial("./templates/login/loginPage.hbs");
            })
        });

        this.post("#/login", function (ctx) {
            const { username, password } = ctx.params;

            post("user", "login", { username, password }, "Basic")
                .then(userinfo => {
                    sessionStorage.setItem("userId", userinfo._id);
                    sessionStorage.setItem("authtoken", userinfo._kmd.authtoken);
                    sessionStorage.setItem("username", userinfo.username);
                    sessionStorage.setItem("creator_id", userinfo._acl);
                    // console.log(userinfo);
                    ctx.redirect("#/");
                })
                .catch(console.error);
        });

        this.get("#/register", function (ctx) {
            getSessionInfo(ctx);
            partials["registerForm"] = "./templates/register/registerForm.hbs";   // добавяме ново пропърти на обекта partials
            this.loadPartials(partials).then(function () {
                this.partial("./templates/register/registerPage.hbs");
            })
        });

        this.post("#/register", function (ctx) {
            // console.log(ctx.params);
            const { username, password, repeatPassword } = ctx.params;
            // if (password === repeatPassword) {
            post("user", "", { username, password }, "Basic")
                .then(data => {
                    console.log(data);
                    ctx.redirect("#/login");
                })
                .catch(console.error)
            // }
            // ctx.redirect("#/login")
            console.log(ctx);
        })

        this.get("#/catalog", function (ctx) {
            getSessionInfo(ctx);
            partials["team"] = "./templates/catalog/team.hbs";   //добавям в обекта partials ново пропърти за 'team' боди (вече имам хедър и футър)

            get("appdata", "teams", "Kinvey")      // първо правим заявката. Слагаме Кинви или нищо (тъй като Кинви е в Елса) 
                .then((data) => {
                    ctx.teams = data;              // дата е масив с обектите за отборите, така ги подаваме към handlebars
                    console.log(ctx);
                    this.loadPartials(partials)     // после правим заявка за зареждане на обекта с хедъра, бодито и паршала
                        .then(function () {
                            this.partial("./templates/catalog/teamCatalog.hbs");
                        })
                    // console.log(data);
                })
                .catch(console.error);
        })

        this.get("#/catalog/:id", function (ctx) {       //:id  - правим си променлива(placeholder) в пътя, за да създадем линк към details за отбора
            getSessionInfo(ctx);
            const id = ctx.params.id;         // така си присвояваме стойността на параметъра  име id
            // console.log(id);
            partials["teamMember"] = "./templates/catalog/teamMember.hbs";      // добавям паршалите, които ще се използват в темплейта на тази страничка
            partials["teamControls"] = "./templates/catalog/teamControls.hbs";
            get("appdata", `teams/${id}`, "Kinvey")
                .then(teamInfo => {                 // като получим данните си зареждаме съответната страничка
                    // console.log(teamInfo);
                    ctx.name = teamInfo.name;       // добавяме към контекста ctx получените от заявката данни teamInfo
                    ctx.description = teamInfo.description;
                    ctx.members = teamInfo.members;
                    if (teamInfo.members) {
                        ctx.isAuthor = ctx.userId === teamInfo._acl.creator;
                        ctx.isOnTeam = teamInfo.members.filter(member => member.userId === ctx.userId);
                    }
                    console.log("CTX of the team: ");
                    console.log(ctx);
                    this.loadPartials(partials)
                        .then(function () {
                            this.partial("./templates/catalog/details.hbs")   // основния темплейт, след като сме заредили паршълите
                        })
                })
                .catch(console.error);
        })

        this.get("#/create", function (ctx) {     // Първо имаме ГЕТ, т.е. да заредим формата
            getSessionInfo(ctx);
            partials["createForm"] = "./templates/create/createForm.hbs";   // то си има отделен паршал, зареждаме го като му подаваме път

            this.loadPartials(partials)         // след като заредим частичните темплейти(хедър, футър, криейтФорм), за да ги окомплектоваме към главния 
                .then(function () {             // тогава си зареждаме главния темплейт
                    this.partial("./templates/create/createPage.hbs"); // главен темплейт
                })
        });

        this.post("#/create", function (ctx) {
            const { name, description } = ctx.params;    // приемаме данните, въведени във формата
            const members = [];                         // създаваме масив(от обекти) за id-тата на мемберите
            members.push({ username: sessionStorage.getItem("username"), userId: sessionStorage.getItem("userId") });      // първи член е създателят на отбора 
            post("appdata", "teams", { name, description, members, isAuthor, isOnTeam }, "Kinvey")
                .then((data) => {
                    ctx.redirect("#/catalog");
                })
                .catch(console.error)
        });

        this.get("#/edit/:id", function (ctx) {
            getSessionInfo(ctx);
            const id = ctx.params.id;         
            partials["editForm"] = "./templates/edit/editForm.hbs"; 
            get(("appdata", `teams/${id}`, "Kinvey")
            .then(teamInfo => {                 // като получим данните си зареждаме съответната страничка
                // console.log(teamInfo);
                ctx.name = teamInfo.name;       // добавяме към контекста ctx получените от заявката данни teamInfo
                ctx.description = teamInfo.description;
                ctx.members = teamInfo.members;
                if (teamInfo.members) {
                    ctx.isAuthor = ctx.userId === teamInfo._acl.creator;
                    ctx.isOnTeam = teamInfo.members.filter(member => member.userId === ctx.userId);
                }
                console.log("CTX of the team: ");
                console.log(ctx);
                this.loadPartials(partials)
                    .then(function () {
                        this.partial("./templates/catalog/details.hbs")   // основния темплейт, след като сме заредили паршълите
                   }) 
            })
            .catch(console.error));
        });

        this.get("#/logout", function (ctx) {
            getSessionInfo(ctx);
            sessionStorage.clear();  // изчиствам сешънсториджа, така ме забравя и ме логаутва ;) 
            ctx.redirect("#/");
        })

        function loadHome(ctx) {
            getSessionInfo(ctx);
            this.loadPartials(partials)    // винаги първо си зареждаме Паршълите, търси във файловете ни и връща промис
                .then(function () {         // ТРЯБВА да е function(),  а не ()=>  , заради this
                    this.partial("./templates/home/home.hbs");
                })
        }

    })

    function getSessionInfo(ctx) {
        ctx.userId = sessionStorage.getItem("userId");
        ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
        ctx.username = sessionStorage.getItem("username");
    }

    app.run();
})()

// 01:07
// 01:31
// 01:59