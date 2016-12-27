/* eslint no-underscore-dangle:0 */

import fs from 'fs';
import path from 'path';
import babel from 'babel-core';

const origJs = require.extensions['.js'];

require.extensions['.js'] = (module, fileName) => {
  let newFileName = fileName;
  if (fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native.js') >= 0) {
    newFileName = path.resolve('./test/mocks/react-native.js');
  }
  if (newFileName.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, newFileName);
  }
  const src = fs.readFileSync(newFileName, 'utf8');
  const output = babel.transform(src, {
    filename: newFileName
  }).code;

  return module._compile(output, newFileName);
};
