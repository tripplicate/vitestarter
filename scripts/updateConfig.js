import { copyFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { join } from 'node:path/posix';

import { PATHS, readDir } from '../shared/index.js';

const copy = async templates => {
  let config = join(PATHS.config, 'index.js');

  try {
    for (const template of templates) {
      await copyFile(config, join(template, 'vite', 'index.js'));
    }
  } catch (error) {
    await mkdir(dirname(error.dest));
    copy(templates);
  }
};

const update = async () => {
  const types = await readDir(PATHS.templates);
  const templates = await readDir(PATHS.templates, 2);
  const prepared = templates.filter(template => !types.includes(template));

  await copy(prepared);
};

await update();
