function objFactory(input) {
    return Object.assign({},...JSON.parse(input))
} // с SJON махам кавичките, връщам вместо да принтирам, иначе не го приема джъджа

console.log(objFactory(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`))
console.log(objFactory(`[{"canFly": true},{"canMove":true, "doors": 4},{"capacity": 255},{"canFly":true, "canLand": true}]`))