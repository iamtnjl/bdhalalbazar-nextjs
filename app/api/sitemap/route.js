export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bdhalalbazar.com/home</loc>
    <lastmod>2025-05-17T09:50:25.253Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- Add other URLs similarly -->
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
