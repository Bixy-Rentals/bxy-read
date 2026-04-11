import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Helper to find noindex URLs
function getNoIndexUrls() {
  const urls = new Set();
  const pagesDir = path.resolve("./src/pages");
  const contentDir = path.resolve("./src/content");

  function scanDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath, callback);
        continue;
      }
      callback(fullPath);
    }
  }

  // Scan Content Collections
  scanDir(contentDir, function (filePath) {
    const isMDFile = filePath.endsWith(".md") || filePath.endsWith(".mdx");
    if (!isMDFile) return;

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      if (!data.noindex) return;
      let relative = path.relative(contentDir, filePath);
      let urlPath = relative.replace(/\.(md|mdx)$/, "");
      urlPath = urlPath.replace(/\\/g, "/");
      if (!urlPath.startsWith("/")) urlPath = "/" + urlPath;
      urls.add(urlPath);
      urls.add(urlPath + "/");
    } catch (e) {
      console.warn(`Error parsing frontmatter for ${filePath}`, e);
    }
  });

  // Scan Pages
  scanDir(pagesDir, function (filePath) {
    if (!filePath.endsWith(".astro")) return;

    const content = fs.readFileSync(filePath, "utf-8");
    const hasNoIndexFlag = content.includes("noindex={true}");
    if (!hasNoIndexFlag) return;

    let relative = path.relative(pagesDir, filePath);
    let urlPath = relative.replace(/\.astro$/, "");
    urlPath = urlPath.replace(/\\/g, "/");

    if (urlPath.endsWith("/index")) {
      urlPath = urlPath.replace(/\/index$/, "") || "/";
    } else if (urlPath === "index") {
      urlPath = "/";
    }

    if (!urlPath.startsWith("/")) urlPath = "/" + urlPath;
    urls.add(urlPath);
    urls.add(urlPath + "/");
  });

  return Array.from(urls);
}

const noIndexUrls = getNoIndexUrls();
console.log("Excluding URLs from sitemap:", noIndexUrls);

const DEFAULT_LOCALE = "en";

import node from "@astrojs/node";
import process from "node:process";

// ... other imports

// Adapter selection strategy
function getAdapter() {
  const adapter = process.env.ADAPTER || "node";

  switch (adapter) {
    case "cloudflare":
      return cloudflare({
        platformProxy: {
          enabled: true,
        },
        runtime: {
          mode: "advanced",
          type: "worker",
          nodejsCompat: true,
        },
      });
    case "node":
    default:
      return node({ mode: "standalone" });
  }
}

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "https://blog.bixyrentals.com",
  output: "static",
  image: {
    remotePatterns: [
      // allow all remote images, but prefer https
      { protocol: "https" },
      { protocol: "http" },
    ],
  },
  build: {
    emptyOutDir: true,
  },
  adapter: getAdapter(),
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname;
        return !noIndexUrls.includes(pathname);
      },
    }),
    react(),
    mdx(),
    mermaid(),
    (await import("astro-compress")).default({
      Image: true,
      JavaScript: true,
      HTML: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.DEFAULT_LOCALE": JSON.stringify(DEFAULT_LOCALE),
    },
  },
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: ["en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
