import fs from "fs";

export default class PojectRepository {
  constructor({ file }) {
    this.file = file;
  }

  currentFileContent() {
    return JSON.parse(fs.readFileSync(this.file)).projects;
  }

  find() {
    return this.currentFileContent();
  }

  create(data) {
    const currentFile = this.currentFileContent();
    currentFile.push(data);

    return fs.writeFileSync(this.file, JSON.stringify(currentFile));
  }
}
