function solve() {
    let idNumber = 0;
    let author = "";
    let description = "";
    let reproducible = false;
    let severity = 0;
    let status = "";
    let report = [];
    function inner(arguments) {
        document.getElementsByClassName("report").id = `report_${idNumber}`;
        document.getElementsByTagName("p")[0].innerText = `report_${description}`;









        idNumber++;
        return { ID: Number,
            author: String,
            description: String,
            reproducible: Boolean,
            severity: Number,
            status: String }
    }
}

solve()