const express = require("express");
const fileUpload = require("express-fileupload");
const PORT = 5001;

const app = express();

app.use(fileUpload());

// upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "Please add a file" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
