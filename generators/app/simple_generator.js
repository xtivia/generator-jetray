var glob = require("glob"),
    path = require("path"),
    ejs = require('ejs'),
    fs = require("fs"),
    rimraf = require("rimraf"),
    mkdirp = require("mkdirp")

module.exports = class SimpleGenerator {

  isDir(filename) {
    return filename.indexOf('.') === -1;
  }

  transform(templates_path, ejs_vars, path_prefix = "") {

    let files = glob.sync("**/*", { cwd: templates_path });

    files.forEach(filename => {
      var outputRecord = {}
      if (!this.isDir(filename)) {
        var fullsrcpath = path.join(templates_path, filename)
        var contents = fs.readFileSync(fullsrcpath)
        if (filename.indexOf("ejs.") !== -1) {
          var template = contents.toString()
          var processedTemplate = ejs.render(template, ejs_vars)
          outputRecord.fname = filename.replace('ejs.', '')
          outputRecord.type = 'text'
          outputRecord.contents = processedTemplate
        } else {
          outputRecord.type = 'buffer'
          outputRecord.contents = contents
          outputRecord.fname = filename
        }
      } else {
        outputRecord.type = 'dir'
        outputRecord.fname = filename
      }
      outputRecord.fname = path_prefix + outputRecord.fname
      this.generatedOutputs.push(outputRecord)
    })
  }

  generate(templates_path, destination_path, props) {

    let prefix = ''
    let framework = props.framework
    let gradle = (props.buildsys === 'gradle')

    this.generatedOutputs = []

    if (gradle) {
      prefix = 'src/main/ui/'
      this.transform(path.join(templates_path, 'gradle'), props)
    }

    this.transform(path.join(templates_path, 'npm'), props, prefix)
    this.transform(path.join(templates_path, framework), props, prefix)

    this.write(destination_path)
  }

  write(destination_path) {
    try {
      this.generatedOutputs.forEach(output => {
        let targetPath = path.join(destination_path, output.fname)
        if (output.type === "dir") {
          console.log("Creating directory="+targetPath)
          mkdirp.sync(targetPath)
        } else {
          console.log("Creating file="+targetPath)
          fs.writeFileSync(targetPath, output.contents)
        }
      })
    } catch (err) {
      console.log(err)
      rimraf(destination_path, function () { })
    }
  }

}