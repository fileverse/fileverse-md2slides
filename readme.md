## Fileverse MD2Slides

Convert markdown to HTML slides.

### Install

```bash
npm install @fileverse-dev/md2slides
```


### Usage

```tsx
import { convertMarkdownToHTML } from '@fileverse-dev/md2slides';
```

### Styles

Styles are exported as a CSS file. It's completely optional, but if you want to use the default styles, you can import them like this:

```css
@import '@fileverse-dev/md2slides/styles';
```

--------------------------------

### Plain HTML

If you want to use with plain HTML, you can use the following:

Right now, the only way to use the library is to use the build file and include it in your project.

To do that, clone the repo and build the project:

```bash 
npm run build
```

Go to your dist folder and include the `index.min.js` file in your project:

```html
<script src="index.min.js"></script>
```

Then, you can use the `convertMarkdownToHTML` function to convert your markdown to HTML slides.

For Example:

```tsx
const _u = window.md2slides;
const html = _u.convertMarkdownToHTML('# Hello, world!');
```

#### Optional Styles

If you want to use the default styles, you can import them like this:

```css
<link rel="stylesheet" href="md2slides.css"/>
```