import getFile from "../index.js";

const sampleResult = [
  {
    filename: "sample.md",
  },
  {
    id: 1,
    placeholder: "FileList",
    url: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
  },
];

const sampleDirResult = [
  [
    {
      filename: "sample.md",
    },
    {
      id: 1,
      placeholder: "FileList",
      url: "https://developer.mozilla.org/pt-BR/docs/Web/API/FileList",
    },
  ],
  [
    {
      filename: "sample2.md",
    },
    {
      id: 1,
      placeholder: "DataTransfer",
      url: "https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer",
    },
  ],
  `No links found in file sample_no_links.md!`,
];

describe("getFile::", () => {
  it("Must be a function", () => {
    expect(typeof getFile).toBe("function");
  });
  it("Must return an array equal to the sample result if there are links in the file", async () => {
    expect(await getFile("./test/files/sample.md")).toEqual(sampleResult);
  });
  it("Must return a string if there is no links in the file", async () => {
    expect(typeof (await getFile("./test/files/sample_no_links.md"))).toBe(
      "string"
    );
  });
  it('Must return "No links found in {file name}!" if there is no links in the file', async () => {
    expect(await getFile("./test/files/sample_no_links.md")).toEqual(
      "No links found in file sample_no_links.md!"
    );
  });
  it("Must thrown an error if file reading fails", async () => {
    await expect(getFile("./test/files/sample")).rejects.toThrow();
  });
  it('Must return "Error in file reading" followed by the error code if file reading fails', async () => {
    await expect(getFile("./test/files/sample")).rejects.toThrow(
      /Error in file reading. Error -> .+/
    );
  });
  it("Must return an array equal to the sample result for directories if the input is a directory path", async () => {
    expect(await getFile("./test/files")).toEqual(sampleDirResult);
  });
});
