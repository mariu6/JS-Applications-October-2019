(function () {
    String.prototype.ensureStart = function (string) {
        if (!this.startsWith(string)) {     // ако текста не започва със string
            return `${string}${this}`;      // го добавям в началото с плейсхолдър
        }
        return this.toString();             // ако текста започва със string, го връщам чист
        // return ${this};   - алтернативен запис   
    }

    String.prototype.ensureEnd = function (string) {
        if (!this.endsWith(string)) {
            return `${this}${string}`;
        }
        return this.toString();
    }

    String.prototype.isEmpty = function () {
        return this.toString() === "";
        // Тъй като this е обект, трябва да го направим на стринг, за да го сравним!
    }

    String.prototype.truncate = function (n) {      // За поставяне на многоточие
        if (this.length < 4) {                       // ако текстът е 3(...)  или по-малко(.., .) символа
            return ".".repeat(this.length);          // подай съответния брой точки за многоточие
        }

        if (this.length <= n) {                       // ако n е по-голямо от дължината на текста
            return this.toString();                 // говърни целия
        } else {                                    // иначе
            let theIndex = this.substr(0, n - 1).lastIndexOf(" ");
            // отдели ми частта до n и намери индекса на последния спейс(интервал)
            if (theIndex !== -1) {     // ако съществува интервал
                return this.substr(0, theIndex).toString() + "..."; //отрежи до него (текстът да завършва с цяла дума)
            } else {                    // или 
                return this.substr(0, n - 1).toString() + "...";       // ако няма интервал, изрежи през думата 
            }
        }
    }

    // СТАТИЧЕН МЕТОД
    String.format = function (string, ...params) {
        return params.reduce((prev, current, i) => {
            prev = prev.replace(`{${i}}`, current);
            return prev;
        }, string);
    }
}())





let str = 'my string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8); 
console.log(str);
str = str.truncate(4);
str = str.truncate(2);
str = String.format('The {0} {1} fox',
    'quick', 'brown');
str = String.format('jumps {0} {1}',
    'dog');
str = 'the quick brown fox jumps over the lazy dog';
// console.log(str = str.truncate(43));

str = str.truncate(45);
console.log(str);  