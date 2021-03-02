var innosetupCompiler = require('innosetup-compiler')
var path = require('path')
var fs = require('fs')
var iconv = require('iconv-lite')
function resolve() {
  return path.resolve.apply(path, [__dirname, '..'].concat(...arguments))
}
var rootPath = path.resolve(__dirname, '../')

// `./package.json`
var tmpJson = require(path.resolve(rootPath, './package.json'))
var curReleasesPath = resolve('./releases');
// get config
var setupOptions = {
  issPath: resolve('./config/setup.iss'),
  // only one version path
  files: curReleasesPath,
  resourcesPath: resolve('./build/setup_resources'),
  appPublisher: 'nw-vue-demo, Inc.',
  appURL: 'your url',
  appId: '{{your id}}',
  // data: { name, version, platform }
};

fs.readdir(setupOptions.files, function (err, files) {
  if (err) throw err
  files.forEach(function (fileName) {
    if (!~fileName.indexOf('win')) return

    const curPath = path.resolve(setupOptions.files, fileName)
    fs.stat(curPath, function (err, stats) {
      if (err || stats.isFile()) return
      if (stats.isDirectory()) {
        makeExeSetup(Object.assign({}, setupOptions, { files: curPath, platform: fileName }))
      }
    })
  })
})

function makeExeSetup(opt) {
  const { issPath, files, resourcesPath, appPublisher, appURL, appId, platform } = opt
  const { name, version } = tmpJson
  const tmpIssPath = path.resolve(path.parse(issPath).dir, '_tmp.iss')

  return new Promise(function (resolve, reject) {
    // rewrite name, version to iss
    fs.readFile(issPath, null, function (err, text) {
      if (err) return reject(err)

      let str = iconv.decode(text, 'gbk')
        .replace(/_name_/g, name) // 名字
        .replace(/_appName_/g, name) // app名字，这里用name代替
        .replace(/_version_/g, version) // 版本
        .replace(/_outputPath_/g, 'app') // 路径，这里写死config/app
        .replace(/_outputFileName_/g, name + version) // 输出的文件名
        .replace(/_filesPath_/g, files) // 要打包的文件路径
        .replace(/_resourcesPath_/g, resourcesPath) // 资源路径
        .replace(/_appPublisher_/g, appPublisher) // 软件出版商，自己写
        .replace(/_appURL_/g, appURL) // app线上路径
        .replace(/_appId_/g, appId) // appid


      fs.writeFile(tmpIssPath, iconv.encode(str, 'gbk'), null, function (err) {
        if (err) return reject(err)

        // inno setup start
        innosetupCompiler(tmpIssPath, { gui: false, verbose: true }, function (err) {
          fs.unlinkSync(tmpIssPath)
          if (err) return reject(err)
          resolve(opt)
        })
      })
    })
  })
}
