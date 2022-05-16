const _PATH = require("node:path");
const formidable = require("formidable");
const _FS = require("node:fs");
module.exports.uploadFile = (req, uploadPath = "", callback = null) => {
  if (typeof callback !== "function" && callback !== null) {
    throw "The call back must be a function";
  }

  if (typeof uploadPath !== "string") return;
  const uploadDir =
    uploadPath || _PATH.join(_PATH.dirname(require.main.filename), "upload");
  console.log(uploadPath);
  console.log(req);
  _FS.mkdirSync(uploadDir, { recursive: true });
  try {
    const form = new formidable.IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
      multiples: true,
      maxFileSize: 1024 * 1024 * 5,
    });
    form.parse(req, (err) => {
      if (!err) {
        callback?.();
      }
    });
  } catch (e) {
    console.log(e);
  }
};
