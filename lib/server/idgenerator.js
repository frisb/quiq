"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseID = exports.generateID = void 0;
const os = require("os");
const pad_1 = require("./pad");
const regex = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})\d{3}.+$/;
let incr = 0;
function reducer(prev, curr) {
    return +prev + curr.charCodeAt(0);
}
let fingerprint = (function nodePrint() {
    let padding = 2;
    let pid = pad_1.pad((process.pid).toString(36), padding);
    let hostname = os.hostname().toUpperCase();
    let { length } = hostname;
    let hostId = pad_1.pad(hostname.split('').reduce(reducer, +length + 36).toString(36), padding);
    return pid + hostId;
})();
function generateID(time) {
    if (!time)
        time = new Date();
    let year = time.getFullYear();
    let month = pad_1.pad(time.getMonth() + 1);
    let day = pad_1.pad(time.getDate());
    let hour = pad_1.pad(time.getHours());
    let min = pad_1.pad(time.getMinutes());
    let sec = pad_1.pad(time.getSeconds());
    let millisec = pad_1.pad(time.getMilliseconds(), 3);
    let counter = pad_1.pad(incr, 3);
    let id = `${year}${month}${day}${hour}${min}${sec}${millisec}${counter}${fingerprint}`;
    incr++;
    if (incr > 999)
        incr = 0;
    return id;
}
exports.generateID = generateID;
function parseID(id) {
    let match = id.match(regex);
    if (match !== null) {
        let [, yyyy, MM, dd, HH, mm, ss, zzz] = match;
        return new Date(`${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}.${zzz}Z`);
    }
    throw new Error('Invalid ID');
}
exports.parseID = parseID;
//# sourceMappingURL=idgenerator.js.map