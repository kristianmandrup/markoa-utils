'use strict';

// TODO: turn into class
export default {
  get: function(resource) {
    return function(path) {
      try {
        // do Ajax call
        return path;
      } catch (e) {
        return {error: 'ajax error', resource: resource};
      }
    };
  }
};
