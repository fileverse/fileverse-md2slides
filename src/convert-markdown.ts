import MarkdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import DOMPurify from 'isomorphic-dompurify';

const markdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItFootnote)
  .enable('table');

interface SlideContent {
  type: 'h1' | 'h2' | 'content' | 'image' | 'table';
  content: string;
}

interface ConversionOptions {
  preserveNewlines?: boolean;
  sanitize?: boolean;
  maxCharsPerSlide?: number;
  maxWordsPerSlide?: number;
  maxLinesPerSlide?: number;
}

export function convertMarkdownToHTML(
  markdown: string,
  options: ConversionOptions = {}
): string {
  const {
    preserveNewlines = true,
    sanitize = true,
    maxCharsPerSlide = 1000,
    maxWordsPerSlide = 250,
    maxLinesPerSlide = 8,
  } = options;

  const sections: SlideContent[][] = [];
  let currentSection: SlideContent[] = [];
  let isInTable = false;
  let tableRows: string[] = [];

  const countWords = (text: string): number => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const shouldCreateNewSection = (
    content: string,
    currentContent: SlideContent[]
  ): boolean => {
    const totalChars =
      currentContent.reduce((sum, item) => sum + item.content.length, 0) +
      content.length;
    const totalWords =
      currentContent.reduce((sum, item) => sum + countWords(item.content), 0) +
      countWords(content);
    const totalLines = currentContent.length + 1;

    return (
      totalChars > maxCharsPerSlide ||
      totalWords > maxWordsPerSlide ||
      totalLines > maxLinesPerSlide
    );
  };

  const createNewSection = () => {
    if (currentSection.length > 0) {
      sections.push(currentSection);
      currentSection = [];
    }
  };

  const lines = markdown.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Handle page breaks
    if (line === '===') {
      createNewSection();
      continue;
    }

    // Handle H1 (Title slide)
    if (line.startsWith('# ')) {
      createNewSection();
      const content = line
        .substring(2)
        .replace(/^\*\*|\*\*$/g, '')
        .trim();
      sections.push([{ type: 'h1', content }]);
      continue;
    }

    // Handle H2 (Section header)
    if (line.startsWith('## ')) {
      createNewSection();
      const content = line
        .substring(3)
        .replace(/^\*\*|\*\*$/g, '')
        .replace(/\\/g, '')
        .trim();
      currentSection = [{ type: 'h2', content }];
      continue;
    }

    // Handle tables
    if (line.startsWith('|')) {
      if (!isInTable) {
        isInTable = true;
        tableRows = [];
      }
      tableRows.push(line);
      continue;
    } else if (isInTable) {
      isInTable = false;
      if (tableRows.length > 0) {
        const tableContent = '\n' + tableRows.join('\n') + '\n';
        if (shouldCreateNewSection(tableContent, currentSection)) {
          createNewSection();
        }
        currentSection.push({ type: 'table', content: tableContent.trim() });
        tableRows = [];
      }
    }

    // Handle images
    if (line.match(/!\[.*\]\(.*\)/)) {
      const imgMatch = line.match(/!\[(.*)\]\((.*)\)/);
      if (imgMatch) {
        if (currentSection.length === 0) {
          // Solo image slide
          sections.push([{ type: 'image', content: imgMatch[2] }]);
        } else {
          if (shouldCreateNewSection(line, currentSection)) {
            createNewSection();
          }
          currentSection.push({ type: 'image', content: imgMatch[2] });
        }
        createNewSection();
      }
      continue;
    }

    // Handle regular content
    if (line.length > 0 && !isInTable) {
      if (shouldCreateNewSection(line, currentSection)) {
        createNewSection();
      }
      currentSection.push({ type: 'content', content: line });
    }
  }

  // Handle any remaining content
  createNewSection();

  // Convert sections to HTML
  const htmlSections = sections.map((section) => {
    return section
      .map((content) => {
        let html = '';
        switch (content.type) {
          case 'h1':
            html = `<h1>${content.content}</h1>`;
            break;
          case 'h2':
            html = `<h2>${content.content}</h2>`;
            break;
          case 'image':
            html = `<img src="${content.content}" class="slide-image"/>`;
            break;
          case 'table':
            html = `<div class="table-wrapper">${markdownIt.render(
              content.content
            )}</div>`;
            break;
          default:
            html = markdownIt.render(content.content);
            break;
        }
        return html.trim();
      })
      .filter(Boolean)
      .join('\n');
  });

  // Join sections with page break markers
  let finalHtml = htmlSections
    .filter(Boolean)
    .join('\n<div data-type="page-break" data-page-break="true"></div>\n');

  if (preserveNewlines) {
    // Ensure consistent newline handling
    finalHtml = finalHtml.replace(/\n+/g, '\n').replace(/>\n+</g, '>\n<');
  }

  if (sanitize) {
    finalHtml = DOMPurify.sanitize(finalHtml);
  }

  return finalHtml;
}
