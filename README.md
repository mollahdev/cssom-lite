# CSSOM Lite
Generate css with javascript

---

##How to use:

```jsx
import CSSOMLite from 'cssom-lite';

const sheet = new CSSOMLite();
sheet.addDevice('mobile', 575);
sheet.addDevice('tablet', 768);
sheet.addDevice('laptop', 911);

sheet.addRule('.selector-a', 'background: orange');
sheet.addRule('.selector-a', 'color: white; text-decoration:none');
sheet.addRule('.selector-a', 'text-decoration: underline', {max: 'mobile'});

console.log(sheet.output());

```
