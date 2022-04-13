import chalk from "chalk";
import fs from "fs";
import path, { dirname, extname } from "path";
import { fileURLToPath } from "url";

const __filenameESM = fileURLToPath(import.meta.url);
const __dirnameESM = dirname(__filenameESM);

function setError(error) {
  throw new Error(
    chalk.red("Error in file reading. Error -> " + error.message)
  );
}

function getLinks(text, fileName) {
  const regexp =
    /\[([^\]]+)\]\((https?:\/\/(?:[^$#\s\.]+\.)+[\w]+\/[^\s]+)\)/gm;

  const results = [{ filename: fileName }];

  let match;
  let n = 1;
  while ((match = regexp.exec(text)) !== null) {
    results.push({ id: n, placeholder: match[1], url: match[2] });
    n++;
  }

  return results.length > 1 ? results : `No links found in file ${fileName}!`;
}

async function getText(path, enc) {
  const text = await fs.promises.readFile(path, { encoding: enc });
  const pathParts = path.split("/");
  const fileName = pathParts[pathParts.length - 1];

  return [text, fileName];
}

async function getDirTexts(path_arg, enc) {
  const absPath = path.join(__dirnameESM, path_arg);
  const files = await fs.promises.readdir(absPath, { encoding: enc });
  const texts = await Promise.all(
    files.map(async (file) => {
      const fpath = `${absPath}/${file}`;
      if (extname(fpath) === ".md") {
        const ftext = await fs.promises.readFile(fpath, { encoding: enc });
        return { filename: file, data: ftext };
      } else {
        return { filename: file, message: "Formato de arquivo não suportado!" };
      }
    })
  );
  return texts;
}

export default async function getFiles(path) {
  const encoding = "UTF-8";
  try {
    if (extname(path) === ".md") {
      const [text, fileName] = await getText(path, encoding);
      return getLinks(text, fileName);
    } else {
      const texts = await getDirTexts(path);
      const links = await Promise.all(
        texts.map((text) => {
          return getLinks(text.data, text.filename);
        })
      );
      return links;
    }
  } catch (error) {
    setError(error);
  }
}
