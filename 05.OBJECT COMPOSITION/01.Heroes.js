// В тази задача използваме 4 функции, създааме обекти state
// целта е да не се използва this.  Одолу ще е по-добрия вариант.
function solve() {
    const canCast = (state) => ({           // функция за мага
        cast: (spell) => {                  // spell e "fireball", "thunder" i t.n.
            console.log(`${state.name} cast ${spell}`);
            state.mana--;
        }
    })
    const canFight = (state) => ({          // функция за файтъра
        fight: () => {
            console.log(`${state.name} slashes at the foe!`);
            state.stamina--;
        }
    })


    function fighter(name) {
        let state = {           // нова инстанция - обект state с име: scorcher2, здраве:, stamina:
            name,
            health: 100,
            stamina: 100
        }
        return Object.assign(state, canFight(state));     // асайн асайнва таргет обект и допълва с обект!  т.е. и двата са обекти
    }
    function mage(name) {      // нова инстанция - обект state с име: scorcher, здраве:, мана:
        let state = {   // този state обект ще го подадем на функцията при създаване на кенФайт
            name,
            health: 100,
            mana: 100
        }
        return Object.assign(state, canCast(state));    // имаме пропъртита, добавяме функция canCast()
    }

    return { mage: mage, fighter: fighter }
    // връща инстанция на обект с две пропъртита. Трябва да го извикаме с име: let imeNaInst = solve()
    // вече върху imeNaObekt правим инстанции на mage и fighter
}

let create = solve();            // Създавам функция kreate, която връща обект от 2 пропъртита - функции
const scorcher = create.mage("Scorcher");     // създавам инстанция на create с името scorcher, която ще бъде маг
scorcher.cast("fireball")  //Scorcher cast fireball   // scorcher e obekta state{name: scorcher,...}
scorcher.cast("thunder")    //Scorcher cast thunder
scorcher.cast("light")      //Scorcher cast light

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()    //Scorcher 2 slashes at the foe!

console.log(scorcher2.stamina);  // 99
console.log(scorcher.mana);      // 97
scorcher.cast("light")      //Scorcher cast light


 







