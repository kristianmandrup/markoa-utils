'use strict';

import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

// TODO: change to class with constructor for folder, name, ext!
export default {
  nameFor: function(name, ext) {
    return `${name}.${ext}`;
  },
  pathFor: function(folder, name, ext) {
    return path.join(folder, this.nameFor(name, ext));
  },
  load: function(folder, name, ext) {
    switch (ext) {
      case 'yml':
        return this.loadYaml(folder, name);
      default:
        // using node require to load JSON
        return require(this.pathFor(folder, name, ext));
    }
  },

  loadYaml: function(folder, name, ext = 'yml') {
    try {
      var ymlFilePath = this.pathFor(folder, name, ext);
      var ymlFile = fs.readFileSync(ymlFilePath);
      return yaml.safeLoad(ymlFile, 'utf8');
    } catch (e) {
      // TODO: add real error handler!
      throw e;
    }
  }
};
