// const AutoUpdater = require("../autoupdater");

  // updater = new AutoUpdater(require("../../package.json")),
  // output = document.querySelector("#app");
// console.log(updater);
// async function main() {
//   try {

//     // Download/unpack update if any available
//     const rManifest = await updater.readRemoteManifest();
//     const needsUpdate = await updater.checkNewVersion(rManifest);
//     if (!needsUpdate) {
//       output.innerHTML += `\nApp is up to date...`;
//       return;
//     }
//     if (!confirm("New release is available. Do you want to upgrade?")) {
//       return;
//     }

//     // Subscribe for progress events
//     updater.on("download", (downloadSize, totalSize) => {
//       output.innerHTML = `Downloading...`;
//       console.log("download progress", Math.floor(downloadSize / totalSize * 100), "%");
//     });
//     updater.on("install", (installFiles, totalFiles) => {
//       output.innerHTML = `Installing...\n`;
//       console.log("install progress", Math.floor(installFiles / totalFiles * 100), "%");
//     });

//     const updateFile = await updater.download(rManifest);
//     await updater.unpack(updateFile);
//     alert(`The application will automatically restart to finish installing the update`);
//     await updater.restartToSwap();
//   } catch (e) {
//     console.error(e);
//   }
// }

// main();