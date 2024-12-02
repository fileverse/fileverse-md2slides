import { convertMarkdownToHTML } from './src/convert-markdown';

const markdown = `# Test Title

## Section 1

This is a test paragraph.

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |

===

## Section 2

This is another section.
`;

const html = convertMarkdownToHTML(markdown);
console.log(html);
