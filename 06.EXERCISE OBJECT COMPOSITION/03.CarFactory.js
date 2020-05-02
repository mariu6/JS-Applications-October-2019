function solve(input) {
    const engineTypes = [               // правим си колекция от моделите, 
        { power: 90, volume: 1800 },    // сортирани във възходящ ред, 
        { power: 120, volume: 2400 },   // за да можем после да си вземем
        { power: 200, volume: 3500 }    // правилния двигател чрез input.find(първото намерено)
    ]

    // Тъй като получаваме инпут - масив, направо го достъпваме с инпут.нещо
    return {     // преподреждам си входния инпут в моя масив
        model: input.model,
        engine: engineTypes.find(e => input.power <= e.power),
        // търся в колкцията ми кой е най-близкия по-мощен двигател от инпута. Затова колекцията ми е сортирана ;)
        carriage: { type: input.carriage, color: input.color },
        wheels: Array(4).fill(input.wheelsize %2 === 0 ? input.wheelsize -1 : input.wheelsize)
        // правя си масив от 4 елемента и го запълвам с най-близкия по-малък нечетен размер
    }
}

console.log(solve(
    {
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));