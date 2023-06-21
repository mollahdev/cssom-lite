## Installation

### CSSOM-Lite

CSSOM-Lite is available as an [npm package](https://www.npmjs.com/package/@mollahdev/cssom-lite).

**npm:**

```sh
npm i @mollahdev/cssom-lite
```

## Import and register device:

```jsx
import CSSOMLite from '@mollahdev/cssom-lite';

const sheet = new CSSOMLite();

// register devices
sheet.addDevice('mobile', 575);
sheet.addDevice('tablet', 768);
sheet.addDevice('laptop', 911);
```

## Add custom plain css text
```jsx
sheet.addCSS(`
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    * {
        margin: 0;
        padding: 0;
    }
`)
```

## Add rule
CSSOM-lite ignores these properties/values, undefined, null, false, true, NaN, ''

```jsx
sheet.addRule('.selector-a', 'background: orange');
sheet.addRule('.selector-a', 'color: white; text-decoration:none');
```

## Add rule and remove old value
By using "remove" property like the example, you can remove already added value,
note: remove property will be ignored in the final css ouput

```jsx
sheet.addRule('.selector-a', 'background: orange');
sheet.addRule('.selector-a', `
    color: white; text-decoration:none;
    remove: background, border, fill;
`);
```

## Add responsive rule
```jsx
sheet.addRule('.selector-a', 'text-decoration: underline', {max: 'mobile'});
sheet.addRule('.selector-heading', 'font-size: 24px', {min: 'mobile', max: 'tablet'});
```

## Clear everything
```jsx
sheet.clear();
```

## Get output
```jsx
sheet.output()
```