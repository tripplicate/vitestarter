import {
  cp, readdir
} from 'node:fs/promises';
import { join } from 'node:path';
import { dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

const _dirname = dirname(fileURLToPath(import.meta.url));

export const getTemplates = async () => {
  let templatePath = join(_dirname, 'templates');
  let types = await readdir(join(templatePath));

  let result = {};

  for (const type of types) {
    let folders = await readdir(join(templatePath, type));
    result[type] = folders;
  }

  return result;
};

export const createTemplate = async ({ language, type, path, }) => {
  const folderPath = join(_dirname, 'templates', language, type);

  let blackList = [
    'node_modules', 'package-lock.json', 'pnpm-lock.yaml'
  ];

  await cp(folderPath, path, {
    recursive: true,
    async filter(source) {
      return !(source.includes(...blackList));
    },
  });

  return folderPath;
};
