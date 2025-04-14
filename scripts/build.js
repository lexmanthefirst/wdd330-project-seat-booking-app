/**
 * Build script to copy partial files and other important assets to the dist directory
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.resolve(rootDir, "src");
const distDir = path.resolve(rootDir, "dist");

// Function to copy a directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read the source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyDir(srcPath, destPath);
    } else {
      // Copy files
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Main build function
async function build() {
  try {
    console.log("Starting build process...");

    // Run Vite build
    console.log("Running Vite build...");
    execSync("npm run build", { stdio: "inherit" });

    // Copy partial files
    console.log("Copying partial files...");
    const partialsDir = path.resolve(srcDir, "public", "partials");
    const distPartialsDir = path.resolve(distDir, "src", "public", "partials");
    copyDir(partialsDir, distPartialsDir);

    // Copy assets
    console.log("Copying assets...");
    const assetsDir = path.resolve(srcDir, "public", "assets");
    const distAssetsDir = path.resolve(distDir, "src", "public", "assets");
    copyDir(assetsDir, distAssetsDir);

    // Copy images
    console.log("Copying images...");
    const imagesDir = path.resolve(srcDir, "public", "images");
    const distImagesDir = path.resolve(distDir, "src", "public", "images");
    copyDir(imagesDir, distImagesDir);

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Run the build
build();
