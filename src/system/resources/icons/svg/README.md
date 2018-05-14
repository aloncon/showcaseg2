# Showcase Icons

At the moment we are import the SVG as is from the folder, in the next phase we will wrap them in React component which will give us more modular code for future changes.

## How to import:

```jsx
import hamburgerSVGIcon from '../../resources/icons/svg/hamburger.svg';
import { WcImg } from '../WcResource';
...
...
...
  render() {
    return (
     ...
        <WcImg src={hamburgerSVGIcon} />
     ...
    );
  }
```

## How to change the SVG size/color:
An a SVG example:
```html
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
   <title>Hamburger</title>
   <path d="M16.87,10.13H1.29a1.13,1.13,0,0,1,0-2.26H16.87a1.13,1.13,0,0,1,0,2.26Z"/>
   <path d="M16.87,15.8H1.29a1.14,1.14,0,0,1,0-2.27H16.87a1.14,1.14,0,0,1,0,2.27Z"/>
   <path d="M16.87,4.47H1.29a1.14,1.14,0,0,1,0-2.27H16.87a1.14,1.14,0,0,1,0,2.27Z"/>
</svg>
```

### To change the size:

Change the values in the attributes **width** and **height**.

For example: Change the to `25x25` dimensions.
```html
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18">
   <title>Hamburger</title>
   <path d="M16.87,10.13H1.29a1.13,1.13,0,0,1,0-2.26H16.87a1.13,1.13,0,0,1,0,2.26Z"/>
   <path d="M16.87,15.8H1.29a1.14,1.14,0,0,1,0-2.27H16.87a1.14,1.14,0,0,1,0,2.27Z"/>
   <path d="M16.87,4.47H1.29a1.14,1.14,0,0,1,0-2.27H16.87a1.14,1.14,0,0,1,0,2.27Z"/>
</svg>
```

### To change the color:

Add a new attribute by the name: "**_fill_**", and give it the color you need.

For example: Change to the color <span style="color:purple">**purple**</span>.
```html
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18" fill="purple">
   <title>Hamburger</title>
   <path d="M16.87,10.13H1.29a1.13,1.13,0,0,1,0-2.26H16.87a1.13,1.13,0,0,1,0,2.26Z"/>
   <path d="M16.87,15.8H1.29a1.14,1.14,0,0,1,0-2.27H16.87a1.14,1.14,0,0,1,0,2.27Z"/>
   <path d="M16.87,4.47H1.29a1.14,1.14,0,0,1,0-2.27H16.87a1.14,1.14,0,0,1,0,2.27Z"/>
</svg>
```