const path = require('path');
const { Command } = require('commander');
const exists = require('fs').existsSync
const program = new Command();
const { uid } = require('uid');
const download = require('download-github-repo');
const rm = require('rimraf').sync;
const Khaos = require('khaos');

program
  .usage('<template-name> <project-name>');

program.on('--help', function () {
  // console.log('vue-cli');
});

program.parse(process.argv);

var template = program.args[0];
var name = program.args[1];
var dir = program.directory;
var to = path.resolve(name);
if (exists(to)) {
  console.log(name + '已经存在！');
}

if (exists(template)) {
  generate(template, to, function (err) {
    if (err) {
      console.log('fail...');
    } else {
      console.log('succ...');
    }
  });
} else {
  if (!~template.indexOf('/')) {
    template = 'vuejs-templates/' + template;
  }

  var tmp = '/tmp/vue-template-' + uid();
  console.log(tmp);
  download(template, tmp, function (err) {
    if (err) {
      console.log(err);
    }
    generate(tmp, to, function (err) {
      if (err) {
        console.log(err);
      }
      rm(tmp);
      console.log('complete');
    });
  });
}

function generate (src, dest, fn) {
  var template = path.join(src, 'template');
  var khaos = new Khaos(template);
  var opts = options(src);
  console.log(opts);
  khaos.schema(opts.schema);
  khaos.read(function (err, files) {
    khaos.parse(files, function (err, schema) {
      console.log(schema);
      khaos.prompt(schema, function (err, answers) {
        Object.keys(schema).forEach(function (key) {
          if (
            typeof schema[key] === 'object' &&
            schema[key].type === 'string' &&
            schema[key].default != null &&
            answers[key] === ''
          ) {
            answers[key] = schema[key].default
          }
        })
        console.log(answers);
        khaos.write(dest, files, answers, fn)
      });
    });
  });
}

function options (dir) {
  var file = path.join(dir, 'meta.json')
  var opts = exists(file)
    ? metadata.sync(file)
    : {}
  defaultName(opts)
  return opts
}

function defaultName (opts) {
  var schema = opts.schema || (opts.schema = {})
  if (!schema.name || typeof schema.name !== 'object') {
    schema.name = {
      'type': 'string',
      'default': name
    }
  } else {
    schema.name['default'] = name
  }
}
