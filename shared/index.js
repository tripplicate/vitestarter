import { lstatSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path/posix';
import { cwd } from 'node:process';

export const PATHS = {
  packages: join(cwd(), 'packages'),
  config: join(cwd(), 'packages', 'config'),
  templates: join(cwd(), 'packages', 'template'),
};

export const readDir = async (dir, depth = 1, result = []) => {
  try {
    if (depth <= 0) {
      return result;
    }

    for (const folder of await readdir(dir)) {
      let path = join(dir, folder);

      if (lstatSync(path).isDirectory()) {
        result.push(path);
        await readDir(path, depth - 1, result);
      }

    }

    return result;

  } catch (error) {
    throw new Error(error);
  }
};
