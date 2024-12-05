## Fileverse MD2Slides

Convert Markdown to HTML / PDF slides with customizeable pagination and styles. Standardized for compatibility with most editors.  
  
Download the package below or use the app directly: **ddocs.new** (live 12/12/24)  

ddocs.new is a privacy preserving and decentralized alternative to gDocs created by @fileverse.  
  
**Quick examples:**

* Upload or paste Markdown text to automatically convert it to slides using standardized conversion rules (see below).
* Modify the slides pagination using === to indicate page breaks.
* Modify the style of your text
* Access a simple UI (improved CSS) to visualize your md text and how it converts into slides
* Visualize and export slides to HTML or PDF


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


### Automatic conversion rules from Markdown to slides

* H1 = Always on one slide (Title slide)
* H2 = Always starts a slide, until the next H2 (Acts as a page breaker)
* H3 = Normal slide text (Paragraph text)
* If the content doesn’t fit the container, it continues to the next slide
* Images = maintaining the ratio of the original image and resizing to fit
* If one page break, contains only one image, the image takes up the full slide
* If there is an image with H2, H3 the image has a fixed side and placement
* Page breaker = Separates content into separate slides based on the break
    
      
      
**Roadmap & open issues:**  
      
 We will be improving on this package and UI in the coming weeks based on people’s feedback. We plan on focusing on the following items first and have some open issues for which we encourage contributions:

* Diagram and charting integration (eg. Mermaid)
* Improve pagination rules
* Improve image support
* Improve styling for tables
* Replace “Print” for PDF with "Download as PDF”
* CLI support
* Dark mode for slides

**Acknowledgments**:  
This repository is inspired by earlier work of @vbuterin’s available [here](https://github.com/vbuterin/slides_editor)



