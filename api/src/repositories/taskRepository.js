import fs from "fs";

export default class TaskRepository {
  constructor({ file }) {
    this.file = file;
  }

  currentFileContent() {
    return JSON.parse(fs.readFileSync(this.file)).tasks;
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
