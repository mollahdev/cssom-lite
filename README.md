# CSSOM Lite
Generate css with javascript

---

##How to use:

```jsx
import CSSOMLite from 'cssom-lite';

const sheet = new CSSOMLite();

// register devices
sheet.addDevice('mobile', 575);
sheet.addDevice('tablet', 768);
sheet.addDevice('laptop', 911);

// add custom plain css
sheet.addCSS(`
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    * {
        margin: 0;
        padding: 0;
    }
`)

// add css rule 
sheet.addRule('.selector-a', 'background: orange');
sheet.addRule('.selector-a', 'color: white; text-decoration:none');

// add responsive css rule
sheet.addRule('.selector-a', 'text-decoration: underline', {max: 'mobile'});
sheet.addRule('.selector-heading', 'font-size: 24px', {min: 'mobile', max: 'tablet'});

// clear everything 
sheet.clear();

// get output
console.log(sheet.output());

```
