/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bdhalalbazar.com",
  generateRobotsTxt: true,
  exclude: [
    "/we/*",
    "/me/*",
    "/cart",
    "/checkout",
    "/login",
    "/register",
  ],
  robotsTxtOptions: {
    additionalSitemaps: ["https://bdhalalbazar.com/sitemap.xml"],
  },
};
