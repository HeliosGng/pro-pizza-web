import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Enable gzip/deflate compression for optimal performance
app.use(compression());

// Let's protect headers using simplified helmet-like configurations

// Fallback safety to run without optional imports if needed, 
// but since this is our Docker environment, we will install them or write vanilla Node if we want to be safe.
// To keep things super robust and dependency-light, we can use built-in Express static compression features,
// or safe express fallbacks. Let's write standard robust Express.

app.use(
  helmet({
    contentSecurityPolicy: false, // Turn off CSP only if you need to load external maps/images with loose headers
    crossOriginEmbedderPolicy: false,
  })
);

// Serve static assets with caching headers for high performance in production
const cacheTime = 86450000 * 30; // 30 days
app.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: cacheTime,
    setHeaders: (res, filePath) => {
      // Don't cache index.html to ensure users always get the newest release
      if (path.basename(filePath) === "index.html") {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      } else {
        res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
      }
    },
  })
);

// Health check endpoint for Cloud Run/App Engine load balancers
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Fallback all other routing to the SPA index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Production server launched successfully!`);
  console.log(`📡 Listening on http://0.0.0.0:${PORT}`);
});
