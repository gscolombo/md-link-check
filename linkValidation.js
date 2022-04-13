import fetch from "node-fetch";

export default async function validateLink(link) {
  try {
    if (link.url) {
      const res = await fetch(link.url);
      link.status = `${res.status} - ${res.statusText}`;
    }
  } catch (error) {
    link.status = "Error";
    link.errorCode = error.code;
  }
}
