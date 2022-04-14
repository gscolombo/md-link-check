import chalk from "chalk";
import fs from "fs";
import path, { dirname, extname } from "path";

function setError(error) {
  throw new Error(
    chalk.red("Error in file reading. Error -> " + error.message)
  );
}

function getLinks(text, fileName) {
  const regexp =
    /\[([^\]]+)\]\((https?:\/\/(?:[^$#\s\.]+\.)+[\w]+\/[^\s]+)\)/gm;

  const file = { filename: fileName, links: [] };

  let match;
  let n = 1;
  while ((match = regexp.exec(text)) !== null) {
    file.links.push({ id: n, placeholder: match[1], url: match[2] });
    n++;
  }

  file.links =
    file.links.length === 0
      ? `No links found in file ${fileName}!`
      : file.links;

  return file;
}

async function getText(path, enc) {
  const text = await fs.promises.readFile(path, { encoding: enc });
  const pathParts = path.split("/");
  const fileName = pathParts[pathParts.length - 1];

  return [text, fileName];
}

async function getDirTexts(path_arg, enc) {
  const absPath = path.join(dirname(path_arg), "..", path_arg);
  const files = await fs.promises.readdir(absPath, { encoding: enc });
  const texts = await Promise.all(
    files.map(async (file) => {
      const fpath = `${absPath}/${file}`;
      if (extname(fpath) === ".md") {
        const ftext = await fs.promises.readFile(fpath, { encoding: enc });
        return { filename: file, data: ftext };
      } else {
        return { filename: file, message: "File type not supported!" };
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
