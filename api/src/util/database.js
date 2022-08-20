import fs from "fs";

export function read(file, source) {
  return JSON.parse(fs.readFileSync(file))[source];
}

export function write(file, source, data) {
  const currentFile = JSON.parse(fs.readFileSync(file));
  currentFile[source].push(data);
  return fs.writeFileSync(file, JSON.stringify(currentFile));
}

export function overwrite(file, source, data) {
  const currentFile = JSON.parse(fs.readFileSync(file));
  currentFile[source] = data;
  return fs.writeFileSync(file, JSON.stringify(currentFile));
}

export function reset(file) {
  return fs.writeFileSync(
    file,
    JSON.stringify({
      users: [],
      projects: [],
      tasks: [],
    })
  );
}

export function checkAndCreateDatabase(file) {
  try {
    if (!fs.existsSync(file)) {
      console.info("creating database...");
      reset(file);
    }
  } catch (err) {
    reset(file);
  }
}

export default {
  read,
  reset,
  write,
  overwrite,
  checkAndCreateDatabase,
};
