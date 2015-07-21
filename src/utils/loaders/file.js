import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

export default class File {
    constructor(name, ext = 'yml', folder = '') {
      if (typeof name !== 'string') {
        throw {message: 'File name must be a String'};
      }

      if (ext && typeof ext !== 'string') {
        throw {message: 'File ext must be a String'};
      }

      if (folder && typeof folder !== 'string') {
        throw {message: 'Folder must be a String'};
      }

      this.folder = folder;
      this.name = name;
      this.ext = ext;
    }

    nameFor() {
      return `${this.name}.${this.ext}`;
    }

    pathFor() {
      return path.join(this.folder, this.nameFor());
    }

    load(folder, name, ext) {
      switch (ext) {
        case 'yml':
          return this.loadYaml(this.folder, this.name);
        default:
          // using node require to load JSON
          return require(this.pathFor());
      }
    }

    loadYaml() {
      try {
        var ymlFilePath = this.pathFor();
        var ymlFile = fs.readFileSync(ymlFilePath);
        return yaml.safeLoad(ymlFile, 'utf8');
      } catch (e) {
        // TODO: add real error handler!
        throw e;
      }
    }
}
