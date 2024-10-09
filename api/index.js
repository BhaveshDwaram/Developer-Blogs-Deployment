const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const aws = require("aws-sdk");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// AWS S3 Setup
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer storage setup for S3
const storage = multer.memoryStorage(); // Use memory storage for S3

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileName = Date.now() + file.originalname;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Bucket name
    Key: fileName, // File name
    Body: file.buffer, // File content
    ContentType: file.mimetype, // File type
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error in file upload" });
    }
    return res.status(200).json({ url: data.Location }); // Return the URL of the uploaded image
  });
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend is running on port ${port}`));
