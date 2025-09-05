const fs = require("fs");
const path = require("path");

const BASE_URL = "https://middi870.github.io";
const MAX_URLS_PER_SITEMAP = 50000; // Google limit

// Recursively collect all HTML files
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getHtmlFiles(fullPath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

// Convert file path to <url> entry
function generateUrlTag(filePath) {
  const relativePath = filePath.replace(__dirname, "").replace(/\\/g, "/");
  let url = BASE_URL + relativePath;

  // Shorten index.html to /
  url = url.replace("/index.html", "/");

  const lastmod = new Date().toISOString().split("T")[0];

  // Priority rules
  let priority = "0.7";
  if (url === BASE_URL + "/") priority = "1.0";
  else if (url.includes("project") || url.includes("quiz")) priority = "0.8";
  else if (url.includes("old_index")) priority = "0.5";

  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

// Generate a sitemap file
function createSitemapFile(urls, index) {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const filename = index === 0 ? "sitemap.xml" : `sitemap-${index}.xml`;
  fs.writeFileSync(filename, sitemapContent, "utf-8");
  console.log(`✅ ${filename} generated!`);
  return filename;
}

// Generate sitemap index file
function createSitemapIndex(files) {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files
  .map(
    f => `  <sitemap>
    <loc>${BASE_URL}/${f}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  fs.writeFileSync("sitemap_index.xml", sitemapIndex, "utf-8");
  console.log("✅ sitemap_index.xml generated!");
}

// Main
function generateSitemaps() {
  try {
    const htmlFiles = getHtmlFiles(__dirname);

    if (htmlFiles.length === 0) {
      console.error("❌ No HTML files found in repository. Exiting.");
      process.exit(1);
    }

    const urls = htmlFiles.map(generateUrlTag);

    // Split into multiple sitemap files if needed
    const sitemapFiles = [];
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
      const chunk = urls.slice(i, i + MAX_URLS_PER_SITEMAP);
      const filename = createSitemapFile(
        chunk,
        i === 0 ? 0 : i / MAX_URLS_PER_SITEMAP
      );
      sitemapFiles.push(filename);
    }

    // Create index
    createSitemapIndex(sitemapFiles);

    console.log("🎉 All sitemaps generated successfully!");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err.message);
    process.exit(1);
  }
}

generateSitemaps();
