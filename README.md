# CSSOM Lite
Generate css with javascript

## Import and register device:

```jsx
import CSSOMLite from 'cssom-lite';

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
```jsx
sheet.addRule('.selector-a', 'background: orange');
sheet.addRule('.selector-a', 'color: white; text-decoration:none');
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