"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const padStart = (str, length, pad) => {
    const s = String(str);
    if (!s || s.length >= length) {
        return s;
    }
    return `${Array(length + 1 - s.length).join(pad)}${str}`;
};
const addZero = (str, length = 2) => padStart(str, length, '0');
const initList = (length, fill = undefined) => {
    const arr = [];
    for (let i = 0; i < length; ++i) {
        arr.push(fill);
    }
    return arr;
};
exports.default = {
    l: initList,
    z: addZero,
};
