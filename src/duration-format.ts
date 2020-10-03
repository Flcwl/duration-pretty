import Utils from './utils'

interface DurationTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

enum DurationType {
  seconds = 'seconds',
  milliseconds = 'milliseconds',
}

interface Duration {
  $d: DurationTime
  $t: number
  format: (formatStr: string) => string
}

const MS_PER_SECOND = 1e3
const SECONDS_PER_MIN = 60
const MINS_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_MONTH = 30
const DAYS_PER_YEAR = 365

const ONE_MS = 1
const ONE_SECOND = ONE_MS * MS_PER_SECOND // second
const ONE_MIN = ONE_SECOND * SECONDS_PER_MIN // minute
const ONE_HOUR = ONE_MIN * MINS_PER_HOUR // hour
const ONE_DAY = ONE_HOUR * HOURS_PER_DAY // day
const MONTH = ONE_DAY * DAYS_PER_MONTH // month
const ONE_YEAR = ONE_DAY * DAYS_PER_YEAR // year

const DAYS = 0
const HOURS = 1
const MINUTES = 2
const SECONDS = 3
const MILLISECONDS = 4
const RULES_LENGTH = 5
const matchRules = [
  { label: 'D', name: 'days', pos: DAYS, next: HOURS_PER_DAY },
  { label: 'H', name: 'hours', pos: HOURS, next: MINS_PER_HOUR },
  { label: 'm', name: 'minutes', pos: MINUTES, next: SECONDS_PER_MIN },
  { label: 's', name: 'seconds', pos: SECONDS, next: MS_PER_SECOND },
  { label: 'SSS', name: 'milliseconds', pos: MILLISECONDS, next: ONE_MS },
]
const REGEX_FORMAT = /\[([^\]]+)]|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g
const TIME_TRANSFORM = {
  toSeconds(time: number) {
    return Math.floor(time / ONE_SECOND)
  },

  toMinutes(time: number) {
    return Math.floor(time / ONE_MIN)
  },

  toHours(time: number) {
    return Math.floor(time / ONE_HOUR)
  },

  toDays(time: number) {
    return Math.floor(time / ONE_DAY)
  },

  toMonths(time: number) {
    return Math.floor(time / MONTH)
  },

  toYears(time: number) {
    return Math.floor(time / ONE_YEAR)
  },

  milliseconds(ms: number): DurationTime {
    const days = this.toDays(ms)
    const hours = this.toHours(ms) % HOURS_PER_DAY
    const minutes = this.toMinutes(ms) % MINS_PER_HOUR
    const seconds = this.toSeconds(ms) % SECONDS_PER_MIN
    const milliseconds = Math.floor(ms) % MS_PER_SECOND
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    }
  },

  seconds(seconds: number): DurationTime {
    return this.milliseconds(seconds * 1000)
  },
}

export const duration = (t: unknown, type: DurationType = DurationType.milliseconds): Duration => {
  if (typeof t !== 'number') {
    throw new TypeError('Expected a number')
  }

  const formatFunc = TIME_TRANSFORM[type]

  if (!formatFunc) {
    throw new TypeError('Expected a string in milliseconds|seconds')
  }

  const dur = formatFunc.call(TIME_TRANSFORM, Math.abs(t < 0 ? 0 : t))

  return {
    $d: dur,
    $t: t,
    format(formatStr = 'HH:mm:ss-SSS') {
      const visited = Utils.l(RULES_LENGTH, false)
      const dates = Utils.l(RULES_LENGTH, 0)
      let t = 0

      matchRules.forEach((item) => {
        if (!formatStr.match(item.label)) {
          t += dur[item.name] * item.next
          return
        }

        if (!visited[item.pos]) {
          dates[item.pos] = t + dur[item.name]
          t = 0
          visited[item.pos] = true
        }
      })

      const matches = {
        D: dates[DAYS],
        DD: Utils.z(dates[DAYS]),
        H: String(dates[HOURS]),
        HH: Utils.z(dates[HOURS]),
        m: String(dates[MINUTES]),
        mm: Utils.z(dates[MINUTES]),
        s: String(dates[SECONDS]),
        ss: Utils.z(dates[SECONDS]),
        SSS: Utils.z(dates[MILLISECONDS], 3),
      }

      // replace $1
      return formatStr.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match])
    },
  }
}
