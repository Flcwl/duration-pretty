# Duration Pretty

[![Build Status](https://travis-ci.org/Flcwl/duration-pretty.svg?branch=master)](https://travis-ci.org/github/Flcwl/duration-pretty)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Flcwl/duration-pretty/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/duration-pretty.svg?style=flat)](https://www.npmjs.com/package/duration-pretty)

> The plugin is a pure JavaScript library that parses duration time length to format display.

## Getting Started

### Installation

```console
npm install --save duration-pretty
```

### Documentation

The `duration(timestamp, type)` get two parameters: timestamp && type.

```js
timestamp: number
type: seconds | milliseconds
```

Format duration time using a template string to `format()`.

```js
var { duration } = require('duration-pretty')

duration(7380, 'seconds').format('H:mm') // "2:03"
```

The template string is parsed for universal token characters, which are replaced with the duration's value for each unit type. The tokens are:

```js
days: D | DD
hours: H | HH
minutes: m | mm
seconds： s | ss
milliseconds: SSS
```

Escape token characters within the template string using `[]`.

```js
duration(3661, 'seconds').format('H [hrs], m [mins]') // "2 hrs, 3 mins"
```

## Tests

You can find all cases in `files:/test/*.spec.js`, And testing Using below script.

```console
npm run test
```
