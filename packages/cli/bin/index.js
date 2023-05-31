#!/usr/bin/env node

import { join } from 'node:path/posix';

import { input, select } from '@inquirer/prompts';
import { createTemplate, getTemplates } from '@vitestarter/template';

let templates = await getTemplates();

let language = await select({
  message: 'Select projects language',
  choices: Object.keys(templates).map(key => ({
    name: key,
    value: key,
  })),
});

let type = await select({
  message: 'Select projects type',
  choices: templates[language].map(template => ({
    name: template,
    value: template,
  })),
});

let path = await input({
  message: 'Enter projects path',
});

let options = {
  language,
  type,
  path: join(process.cwd(), path),
};

try {
  createTemplate(options);
  console.log('Template has been created');
} catch (error) {
  console.log(error);
}
