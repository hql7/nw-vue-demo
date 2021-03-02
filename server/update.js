/*
 1. Check the manifest for version (from your running "old" app).
 2. If the version is different from the running one, download new package to a temp directory.
 3. Unpack the package in temp.
 4. Run new app from temp and kill the old one (i.e. still all from the running app).
 5. The new app (in temp) will copy itself to the original folder, overwriting the old app.
 6. The new app will run itself from original folder and exit the process.
*/
import gui from 'nw.gui';
import updater from 'node-webkit-updater';
import pkg from '../package.json'; // Insert your app's manifest here
var upd = new updater(pkg);
// var path = require("path");

//此处自定义下载目录
//var parentPath= path.resolve(gui.__dirname, '.')
//upd.options.temporaryDirectory=path.dirname(parentPath)
var copyPath, execPath;

console.log(gui.App.argv.length);

// Args passed when new app is launched from temp dir during update
if (gui.App.argv.length > 0) {
  console.log(gui.App.argv);
  // ------------- Step 5 -------------
  copyPath = gui.App.argv[0];
  execPath = gui.App.argv[1];
  console.log(copyPath, execPath);
  // Replace old app, Run updated app from original location and close temp instance
  upd.install(copyPath, function (err) {
    if (!err) {
      // ------------- Step 6 -------------
      try {
        upd.run(execPath, [], null);
        gui.App.quit();
      } catch (e) {
        console.log(e);
      }

    }
  });
}
else { // if no arguments were passed to the app
  // ------------- Step 1 -------------
  upd.checkNewVersion(function (error, newVersionExists, manifest) {
    if (!error && newVersionExists) {
      // ------------- Step 2 -------------
      var newApp = upd.download(function (error, filename) {
        console.log(error, filename)
        if (!error) {
          // ------------- Step 3 -------------
          upd.unpack(filename, function (error, newAppPath) {
            console.log(error, newAppPath);
            if (!error) {
              // ------------- Step 4 -------------
              upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()], {});
              gui.App.quit();
            }
          }, manifest);
        }
      }, manifest);

      //进度条
      var loaded = 0;
      newApp.on('data', function (chunk) {
        loaded += chunk.length;
        console.log("New version loading " + Math.floor(loaded / newApp['content-length'] * 100) + '%');
        document.getElementById('loaded').innerHTML = "New version loading " + Math.floor(loaded / newApp['content-length'] * 100) + '%';
      });
    }
  })
}