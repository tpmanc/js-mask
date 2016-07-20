# Js mask

Written in vanilla JS library to add phone mask to your input elements.

## Demo

[Phone mask demo](http://js-mask.chukancev.ru/)

## Requirements

* none

Library is written in vanilla JS and has no dependancies.

## Getting Started

### Download

* [development version](https://raw.githubusercontent.com/tpmanc/js-mask/1.0.0/js-mask.js)

* [minified version](https://raw.githubusercontent.com/tpmanc/js-mask/1.0.0/js-mask.min.js)

## How to use

```html
<html>
   <head></head>
   <body>
      <input type="text" id="phone">
      <!-- Loading the library -->
      <script src="phone-mask.min.js"></script>
   </body>
</html>
```

Add mask to input:

```javascript
var inputs = new PhoneMask(document.querySelectorAll('#phone'));
```

To customize functionality pass settings as second parameter:

```javascript
var inputs = new PhoneMask(document.querySelectorAll('#phone'), {
  pattern: '(xx) xxxx-xx-xx',
  prefix: '+7 ',
  patternChar: 'x'
});
```

To destroy phone mask:

```javascript
var inputs = new PhoneMask(document.querySelectorAll('#phone'));
// destroy mask
inputs.destroy();
```

## Settings

|Setting|Type|Default Value|Description|
|---|---|---|---|
|pattern|String|`'(___) ___-__-__'`|Input formatting pattern|
|patternChar|String|`'_'`|Characters in pattent to replace by entered characters|
|prefix|String|`''`|Phone number prefix|
|igrogeKeyCodes|Array|`[9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93]`|Array of key codes to ignore|
|allowedRegExp|Pattern or false|`/^\d$/`|RegExp pattent for entered characters|

