export function dateFormatter(date) {
    let year = date.match(/\d{4}/gim);
    let month = date.match(/([\/ \.\,\-])(\d{1,2})([\/ \.\,\-])/gim)[0].slice(1, 3).trim();
    let day = date.match(/^(\d{1,2})([\/ \.\,\-])|([\/ \.\,\-])(\d{1,2})$/gim)[0].slice(0, 3).trim();
    if (month > 12) {
        let buff = month;
        month = day;
        day = buff;
    }
    if (month < 10) {
        month = '0'+ month;
    }
    if (day < 10) {
        day = '0'+ day;
    }
    if (year<1000 || month < 0 || day < 0 || day > 31) {
        throw new Error("Invalid date!")
    }
    return `${year}-${month}-${day}`;
}
