const express = require("express");
const app = express();
const port = 3000;
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const budket = "laundrex-assets";
const region = "us-east-1";
const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/remove-file/:key", async (req, res) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: budket,
      Key: req.params.key,
    });
    await client.send(command);
    res.send("Successfully");
  } catch (error) {
    console.log("🚀 ~ app.post ~ error:", error);
    res.send(JSON.stringify(error));
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
