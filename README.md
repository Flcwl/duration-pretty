<p align="center">Duration Format<p>

> The plugin is a pure JavaScript library that parses duration time length to format display.

## Getting Started

### Installation

```console
npm install --save duration-format
```

### Documentation

Format duration time using a template string to `format()`.

```js
var duration = require('duration-format')

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
