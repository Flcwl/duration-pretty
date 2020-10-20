"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duration = void 0;
var utils_1 = require("./utils");
var DurationType;
(function (DurationType) {
    DurationType["seconds"] = "seconds";
    DurationType["milliseconds"] = "milliseconds";
})(DurationType || (DurationType = {}));
var MS_PER_SECOND = 1e3;
var SECONDS_PER_MIN = 60;
var MINS_PER_HOUR = 60;
var HOURS_PER_DAY = 24;
var DAYS_PER_MONTH = 30;
var DAYS_PER_YEAR = 365;
var ONE_MS = 1;
var ONE_SECOND = ONE_MS * MS_PER_SECOND; // second
var ONE_MIN = ONE_SECOND * SECONDS_PER_MIN; // minute
var ONE_HOUR = ONE_MIN * MINS_PER_HOUR; // hour
var ONE_DAY = ONE_HOUR * HOURS_PER_DAY; // day
var MONTH = ONE_DAY * DAYS_PER_MONTH; // month
var ONE_YEAR = ONE_DAY * DAYS_PER_YEAR; // year
var DAYS = 0;
var HOURS = 1;
var MINUTES = 2;
var SECONDS = 3;
var MILLISECONDS = 4;
var RULES_LENGTH = 5;
var matchRules = [
    { label: 'D', name: 'days', pos: DAYS, next: HOURS_PER_DAY },
    { label: 'H', name: 'hours', pos: HOURS, next: MINS_PER_HOUR },
    { label: 'm', name: 'minutes', pos: MINUTES, next: SECONDS_PER_MIN },
    { label: 's', name: 'seconds', pos: SECONDS, next: MS_PER_SECOND },
    { label: 'SSS', name: 'milliseconds', pos: MILLISECONDS, next: ONE_MS },
];
var REGEX_FORMAT = /\[([^\]]+)]|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g;
var TIME_TRANSFORM = {
    toSeconds: function (time) {
        return Math.floor(time / ONE_SECOND);
    },
    toMinutes: function (time) {
        return Math.floor(time / ONE_MIN);
    },
    toHours: function (time) {
        return Math.floor(time / ONE_HOUR);
    },
    toDays: function (time) {
        return Math.floor(time / ONE_DAY);
    },
    toMonths: function (time) {
        return Math.floor(time / MONTH);
    },
    toYears: function (time) {
        return Math.floor(time / ONE_YEAR);
    },
    milliseconds: function (ms) {
        var days = this.toDays(ms);
        var hours = this.toHours(ms) % HOURS_PER_DAY;
        var minutes = this.toMinutes(ms) % MINS_PER_HOUR;
        var seconds = this.toSeconds(ms) % SECONDS_PER_MIN;
        var milliseconds = Math.floor(ms) % MS_PER_SECOND;
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds,
        };
    },
    seconds: function (seconds) {
        return this.milliseconds(seconds * 1000);
    },
};
exports.duration = function (t, type) {
    if (type === void 0) { type = DurationType.milliseconds; }
    if (typeof t !== 'number') {
        throw new TypeError('Expected a number');
    }
    var formatFunc = TIME_TRANSFORM[type];
    if (!formatFunc) {
        throw new TypeError('Expected a string in milliseconds|seconds');
    }
    var dur = formatFunc.call(TIME_TRANSFORM, Math.abs(t < 0 ? 0 : t));
    return {
        $d: dur,
        $t: t,
        format: function (formatStr) {
            if (formatStr === void 0) { formatStr = 'HH:mm:ss-SSS'; }
            var visited = utils_1.default.l(RULES_LENGTH, false);
            var dates = utils_1.default.l(RULES_LENGTH, 0);
            var t = 0;
            matchRules.forEach(function (item) {
                if (!formatStr.match(item.label)) {
                    t += dur[item.name] * item.next;
                    return;
                }
                if (!visited[item.pos]) {
                    dates[item.pos] = t + dur[item.name];
                    t = 0;
                    visited[item.pos] = true;
                }
            });
            var matches = {
                D: dates[DAYS],
                DD: utils_1.default.z(dates[DAYS]),
                H: String(dates[HOURS]),
                HH: utils_1.default.z(dates[HOURS]),
                m: String(dates[MINUTES]),
                mm: utils_1.default.z(dates[MINUTES]),
                s: String(dates[SECONDS]),
                ss: utils_1.default.z(dates[SECONDS]),
                SSS: utils_1.default.z(dates[MILLISECONDS], 3),
            };
            // replace $1
            return formatStr.replace(REGEX_FORMAT, function (match, $1) { return $1 || matches[match]; });
        },
    };
};
