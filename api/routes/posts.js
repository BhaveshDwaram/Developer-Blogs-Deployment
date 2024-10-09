const router = require("express").Router();
const Post = require("../models/Post");
const aws = require("aws-sdk");
const s3 = new aws.S3();

// CREATE POST
router.post("/", async (req, res) => {
  if (!req.body.photo) {
    return res.status(400).json("Image upload is required");
  }
  
  const newPost = new Post({
    username: req.body.username,
    title: req.body.title,
    desc: req.body.desc,
    photo: req.body.photo, // Storing S3 image URL in MongoDB
  });
  
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // Handle image update if necessary
      if (req.body.photo) {
        // Optional: Add logic to upload new image to S3 and update URL in MongoDB
        post.photo = req.body.photo; // Update S3 URL if image changes
      }

      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        // Delete image from S3 if it exists
        if (post.photo) {
          const photoKey = post.photo.split("/").pop(); // Extract file name from URL
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: photoKey,
          };
          s3.deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack); // Handle error
          });
        }

        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
