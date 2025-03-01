const jsonServer = require("json-server");
const multer = require("multer");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Set up storage engine for image uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// API endpoint to handle image upload
server.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(201).json({
    imageUrl: `/uploads/${req.file.filename}`,
    message: "File uploaded successfully",
  });
});

// Use JSON Server for API routes
server.use(router);

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
