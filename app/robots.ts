import type { MetadataRoute } from 'next'

/**
 * LV5-047 — allow all crawlers everywhere except /tour, which the page
 * itself already marks noindex,nofollow (LV5-006 hid the route
 * deliberately). Points crawlers at the sitemap this same route emits.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/tour',
    },
    sitemap: 'https://junoonwellness.com/sitemap.xml',
  }
}
