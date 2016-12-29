var fileName  = process.argv[2].toLowerCase(),
    moduleName = fileName + 's',
    modelName  = fileName.charAt(0).toUpperCase() + fileName.slice(1),
    fs = require('fs');

console.log('Creating directory');
fs.mkdirSync(__dirname + '/../app/src/modules/' + moduleName);

console.log('Creating model');
fs.readFile(__dirname + '/_examples/_model', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/%_MODEL_NAME_%/g, modelName).replace(/%_FILE_NAME_%/g, fileName);

  fs.writeFile(__dirname + '/../app/src/modules/' + moduleName + '/' + fileName +'-model.ts', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Creating controller');
fs.readFile(__dirname + '/_examples/_controller', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/%_MODEL_NAME_%/g, modelName).replace(/%_FILE_NAME_%/g, fileName);

  fs.writeFile(__dirname + '/../app/src/modules/' + moduleName + '/' + fileName +'-controller.ts', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Creating repository');
fs.readFile(__dirname + '/_examples/_repository', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace(/%_MODEL_NAME_%/g, modelName).replace(/%_FILE_NAME_%/g, fileName);

  fs.writeFile(__dirname + '/../app/src/modules/' + moduleName + '/' + fileName +'-repository.ts', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Edit boot file');
fs.readFile(__dirname + '/../app/src/boot.ts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result =
    data
      .replace('\nexport class', `import {i${modelName}Model, ${modelName}} from './modules/${moduleName}/${fileName}-model';\nimport {${modelName}Controller} from './modules/${moduleName}/${fileName}-controller';\nimport {${modelName}Repository} from './modules/${moduleName}/${fileName}-repository';
      \nexport class`)
      .replace('constructor(app){', `\n\tconstructor(app){\n\t\tnew ${modelName}Controller(app, new ${modelName}Repository(${modelName}));`);

  fs.writeFile(__dirname + '/../app/src/boot.ts', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

console.log('Module "'+moduleName + '" successfully created');