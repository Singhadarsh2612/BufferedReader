require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const NodeCache = require("node-cache");

const app = express();
app.use(cors());

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // Cache for 10 minutes

const API_KEY = process.env.VITE_API_KEY;

// 📌 Caching Google Drive PDF List
app.get("/pdfs", async (req, res) => {
  const folderId = req.query.folderId;
  if (!folderId) return res.status(400).send("Missing folderId");

  const cacheKey = `pdfs_${folderId}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("✅ Serving PDFs from cache");
    return res.json(cachedData);
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${API_KEY}&fields=files(id, name, webViewLink)`;
    const response = await axios.get(url);

    cache.set(cacheKey, response.data, 600);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching PDFs:", error);
    res.status(500).send("Failed to fetch PDFs.");
  }
});

// 📌 Caching PDF File Download
app.get("/download", async (req, res) => {
  const fileId = req.query.fileId;
  if (!fileId) return res.status(400).send("File ID is required.");

  try {
    let downloadUrl = cache.get(fileId);
    if (downloadUrl) {
      console.log("✅ Cache hit: Using cached download link.");
    } else {
      console.log("❌ Cache miss: Fetching new download link.");
      const metaResponse = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webContentLink&key=${API_KEY}`
      );
      downloadUrl = metaResponse.data.webContentLink;
      if (!downloadUrl) throw new Error("Download link not found");
      cache.set(fileId, downloadUrl);
    }

    const response = await axios.get(downloadUrl, { responseType: "stream" });
    response.data.pipe(res);
  } catch (err) {
    console.error("Error fetching file:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch the file.");
  }
});

// 📌 Caching Subfolders List
app.get("/subfolders", async (req, res) => {
  const folderId = req.query.folderId;
  if (!folderId) return res.status(400).send("Missing folderId");

  const cacheKey = `subfolders_${folderId}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("✅ Serving subfolders from cache");
    return res.json(cachedData);
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id, name)`;
    const response = await axios.get(url);

    cache.set(cacheKey, response.data, 600);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching subfolders:", error);
    res.status(500).send("Failed to fetch subfolders.");
  }
});

// 📌 Caching Thumbnails
app.get("/thumbnail", async (req, res) => {
  const fileId = req.query.fileId;
  if (!fileId) return res.status(400).send("Missing fileId");

  const cacheKey = `thumbnail_${fileId}`;
  const cachedImage = cache.get(cacheKey);

  if (cachedImage) {
    console.log("✅ Serving thumbnail from cache");
    res.setHeader("Content-Type", "image/jpeg");
    return res.send(cachedImage);
  }

  try {
    const url = `https://drive.google.com/thumbnail?id=${fileId}&sz=w150`;
    const response = await axios.get(url, { responseType: "arraybuffer" });

    cache.set(cacheKey, response.data, 600);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    console.error("❌ Error fetching thumbnail:", error);
    res.status(500).send("Error fetching thumbnail");
  }
});

// Serve static files from the dist directory
app.use(express.static("dist"));

// Serve index.html for the root path
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "dist" });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});
