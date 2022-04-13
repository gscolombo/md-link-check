#!/usr/bin/env node
import chalk from "chalk";
import getFiles from "./index.js";
import validateLink from "./linkValidation.js";
import { extname } from "path";

async function processText(path, validate) {
  const files = await getFiles(path);

  if (validate) {
    if (extname(path) === ".md") {
      for (const link of files) {
        await validateLink(link);
      }
    } else {
      for (const file of files) {
        for (const link of file) {
          await validateLink(link);
        }
      }
    }

    console.log(chalk.yellowBright("Links validados:"), files);
  } else {
    console.log(
      Array.isArray(files) ? chalk.yellowBright("Lista de links:") : "",
      files
    );
  }
}

const path = process.argv[2];
const validate =
  process.argv[3] === "-v" || process.argv[3] === "--validate" ? true : false;
processText(path, validate);
