#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs/promises';
import { convertToPDF } from '../index.js';

program
  .name('fileverse-mdtopdf')
  .description('Convert Markdown to PDF')
  .argument('[input]', 'Input markdown file (or stdin)')
  .option('-o, --output <path>', 'Output PDF file path', 'output.pdf')
  .option('-f, --format <format>', 'Page format (A4, Letter, etc.)', 'A4')
  .action(async (input, options) => {
    try {
      let markdownText;

      if (input) {
        // Read from file
        markdownText = await fs.readFile(input, 'utf-8');
      } else {
        // Read from stdin
        const chunks = [];
        for await (const chunk of process.stdin) {
          chunks.push(chunk);
        }
        markdownText = chunks.join('');
      }

      await convertToPDF(markdownText, options.output, {
        format: options.format,
      });

      console.log(`PDF generated successfully: ${options.output}`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
