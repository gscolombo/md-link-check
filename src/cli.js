#!/usr/bin/env node
import chalk from "chalk";
import getFiles from "./index.js";
import validateLink from "./linkValidation.js";
import { extname } from "path";

function getFormattedLink(link) {
  const status = link.status.charAt(0);
  let color;
  switch (status) {
    case "1":
      color = "white";
      break;
    case "2":
      color = "green";
      break;
    case "3":
      color = "blue";
      break;
    case "4":
    case "E":
      color = "red";
      break;
    case "5":
      color = "orange";
      break;
  }

  return `Link placeholder: ${chalk.cyanBright(
    link.placeholder
  )} \n \u2386 Status: ${chalk[color](link.status)} ${
    link.errorCode
      ? `\n \u2386 Error code: ${chalk[color](link.errorCode)}`
      : ""
  } \n`;
}

function printResults(files) {
  if (Array.isArray(files)) {
    console.log(chalk.yellowBright("Links validation results: \n"));
    files.forEach((file) => {
      console.log(chalk.bold(`File name: ${chalk.magenta(file.filename)}`));
      file.links.forEach((link, i, arr) => {
        const stdout = getFormattedLink(link);
        i === arr.length - 1 ? console.log(stdout + "\n") : console.log(stdout);
      });
    });
  } else {
    console.log(
      chalk.yellowBright("Links validation results: \n"),
      chalk.bold(`File name: ${chalk.magenta(files.filename)}`)
    );
    files.links.forEach((link) => {
      const stdout = getFormattedLink(link);
      console.log(stdout);
    });
  }
}

async function processText(path, json) {
  console.log("Reading files... \n");
  const files = await getFiles(path);

  if (extname(path) === ".md") {
    for (const link of files.links) {
      await validateLink(link);
    }
  } else {
    for (const file of files) {
      for (const link of file.links) {
        await validateLink(link);
      }
    }
  }

  json ? console.log(JSON.stringify(files, null, "  ")) : printResults(files);
}

const regexpJsonFlag = /(?<!\-+)\-[jJ]|(?<!\-+)\-{2}json/;
const path = process.argv[2];
const json =
  process.argv.filter((arg, i) => i > 2 && regexpJsonFlag.test(arg)).length > 0
    ? true
    : false;

processText(path, json);
