import validateLink from "../src/linkValidation";

const sampleLinks = [
  {
    id: 1,
    placeholder: "placeholder",
    url: "https://www.google.com.br",
  },
  {
    id: 2,
    placeholder: "placeholder",
    url: "https://www.alura.com.br",
  },
  {
    id: 3,
    placeholder: "placeholder",
    url: "https://developer.mozilla.org/pt-BR/docs/Web/FileList",
  },
  {
    id: 4,
    placeholder: "placeholder",
    url: "error",
  },
];

const validatedSampleLinks = [
  {
    id: 1,
    placeholder: "placeholder",
    url: "https://www.google.com.br",
    status: "200 - OK",
  },
  {
    id: 2,
    placeholder: "placeholder",
    url: "https://www.alura.com.br",
    status: "200 - OK",
  },
  {
    id: 3,
    placeholder: "placeholder",
    url: "https://developer.mozilla.org/pt-BR/docs/Web/FileList",
    status: "404 - Not Found",
  },
  {
    id: 4,
    placeholder: "placeholder",
    url: "error",
    status: "Error",
    errorCode: "ERR_INVALID_URL",
  },
];

describe("validateLink::", () => {
  it("Must be a function", () => {
    expect(typeof validateLink).toBe("function");
  });
  it('Must add a "status" or an "error" property in each link with response status info', async () => {
    for (const link of sampleLinks) {
      await validateLink(link);
    }
    await Promise.all(sampleLinks);
    expect(sampleLinks).toEqual(validatedSampleLinks);
  });
});
