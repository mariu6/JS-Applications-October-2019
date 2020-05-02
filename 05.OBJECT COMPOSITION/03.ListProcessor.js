
function solve(arr) {
    const template = {
        collection: [],
        add(string) {
            return this.collection.push(string);
        },
        remove(string) {
            while (this.collection.includes(string)) {
                this.collection.splice(this.collection.indexOf(string), 1);
            }
            return this.collection;

        },
        print() {
            console.log(this.collection.join(","));
        }
    }

    function inner() {
        let innerObj = Object.create(template);
        arr.map(x => {
            let command = x.split(" ");
            innerObj[command[0]](command[1]);
        })
        return innerObj;
    }
    return inner();
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);


solve(['add pesho', 'add george', 'add peter', 'remove peter','print']);