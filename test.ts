import { convertMarkdownToHTML } from './src/index';

const markdown = `# Test Title

## Section 1

This is a test paragraph.

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;

const html = convertMarkdownToHTML(markdown);
console.log(html);
