## Fileverse MD2Slides

A library to convert Markdown content into HTML slides with customizable options.

### Installation

```bash
npm install @fileverse-dev/md2slides
```

### Basic Usage

```tsx
import { convertMarkdownToHTML } from '@fileverse-dev/md2slides';

const markdown = `
# Slide 1
This is the first slide

---

# Slide 2
This is the second slide
`;

const html = convertMarkdownToHTML(markdown);
```

### Configuration

The `convertMarkdownToHTML` function accepts two parameters:
- `markdown`: Your markdown content (required)
- `options`: Configuration object (optional)

```tsx
type Options = {
  preserveNewlines: boolean;  // Preserve line breaks in the output
  sanitize: boolean;         // Sanitize HTML input
  maxCharsPerSlide: number;  // Maximum characters per slide
  maxWordsPerSlide: number;  // Maximum words per slide
  maxLinesPerSlide: number;  // Maximum lines per slide
};
```

Default options:
```tsx
{
  preserveNewlines: true,
  sanitize: true,
  maxCharsPerSlide: 1000,
  maxWordsPerSlide: 250,
  maxLinesPerSlide: 7,
}
```

### Styling

The library includes optional default styles that you can import:

#### With CSS Modules/Preprocessors
```css
@import '@fileverse-dev/md2slides/styles';
```

#### With Plain HTML
```html
<link rel="stylesheet" href="md2slides.css"/>
```

### Browser Usage

For plain HTML/JavaScript projects:

1. Build the library:
```bash
npm run build
```

2. Include the built files in your HTML:
```html
<script src="dist/index.min.js"></script>
<link rel="stylesheet" href="dist/md2slides.css"/>
```

3. Use the global `md2slides` object:
```javascript
const html = window.md2slides.convertMarkdownToHTML(`
# My Presentation
First slide content

---

## Second Slide
- Point 1
- Point 2
`);

document.getElementById('slides').innerHTML = html;
```
