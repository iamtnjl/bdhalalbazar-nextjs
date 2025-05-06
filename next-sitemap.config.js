/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bdhalalbazar.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  exclude: ["/admin/*", "/cart", "/checkout", "/account/*"],
};
