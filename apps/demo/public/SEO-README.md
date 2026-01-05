# SEO Files Documentation

This directory contains SEO-related files for Angular AI Kit.

## Files

### 1. robots.txt

**Purpose:** Controls which search engine crawlers can access the site and where the sitemap is located.

**Location:** `apps/demo/public/robots.txt`

**Current Configuration:**

- Allows all search engines to crawl all pages
- Points to sitemap.xml
- Sets crawl-delay to 1 second to prevent server overload

**When to Update:**

- When changing domains (update sitemap URL)
- When you want to block specific crawlers or pages
- When deploying to production with a custom domain

**Example Custom Configuration:**

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://your-domain.com/sitemap.xml
```

### 2. sitemap.xml

**Purpose:** Helps search engines discover and index all pages on the site.

**Location:** `apps/demo/public/sitemap.xml`

**Contains:**

- All public routes from `apps/demo/src/app/app.routes.ts`
- Priority and change frequency for each page
- Last modified dates

**When to Update:**

1. **When adding new routes** to `app.routes.ts`:

   ```xml
   <url>
     <loc>https://angular-ai-kit.vercel.app/docs/new-page</loc>
     <lastmod>YYYY-MM-DD</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.7</priority>
   </url>
   ```

2. **When changing domains:**
   - Find and replace all instances of `https://angular-ai-kit.vercel.app`
   - Update robots.txt sitemap URL as well

3. **When content updates significantly:**
   - Update the `<lastmod>` date for affected pages

**Priority Guidelines:**

- `1.0` - Homepage (most important)
- `0.9` - Key landing pages (docs home, getting started)
- `0.8` - Important guides and examples
- `0.7` - Component docs and API reference
- `0.6` - FAQ and troubleshooting

**Change Frequency Guidelines:**

- `daily` - Frequently updated content
- `weekly` - Regular updates (guides, main pages)
- `monthly` - Stable content (component docs)
- `yearly` - Rarely changes

### 3. OG Images and Meta Tags

**OG Image:** `Angular-AI-component-library.png` (1200x630px)

**Meta Tags Location:** `apps/demo/src/index.html`

**When to Update:**

- When changing domains (update all `og:url`, `og:image`, `twitter:url`, `twitter:image`)
- When creating a new OG image
- When updating site description

---

## Quick Update Guide

### Changing Domain from Vercel to Custom Domain

**Step 1: Update index.html**

```bash
# Find and replace in index.html
# From: https://angular-ai-kit.vercel.app
# To: https://your-custom-domain.com
```

**Step 2: Update robots.txt**

```txt
Sitemap: https://your-custom-domain.com/sitemap.xml
```

**Step 3: Update sitemap.xml**

```bash
# Find and replace all URLs in sitemap.xml
# From: https://angular-ai-kit.vercel.app
# To: https://your-custom-domain.com
```

**Step 4: Rebuild**

```bash
npx nx build demo
```

### Adding a New Route

**Step 1: Add route to app.routes.ts**

```typescript
{
  path: 'docs/guides/new-guide',
  loadComponent: () => import('./pages/docs/guides/new-guide')
    .then((m) => m.NewGuideComponent),
}
```

**Step 2: Add to sitemap.xml**

```xml
<url>
  <loc>https://angular-ai-kit.vercel.app/docs/guides/new-guide</loc>
  <lastmod>2026-01-05</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

**Step 3: Rebuild**

```bash
npx nx build demo
```

---

## Testing SEO

### Verify Files are Accessible

After deployment, check these URLs:

- `https://your-domain.com/robots.txt`
- `https://your-domain.com/sitemap.xml`

### Test with Google Search Console

1. Add your site to [Google Search Console](https://search.google.com/search-console)
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor crawl status and indexing

### Test OG Tags

Use these tools to verify Open Graph tags:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [OpenGraph.xyz](https://www.opengraph.xyz/)

### Validate Sitemap

- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

---

## Maintenance

**Update Frequency:**

- Review sitemap monthly when adding new pages
- Update `lastmod` dates when content changes significantly
- Check Google Search Console for crawl errors quarterly
- Refresh OG image if branding changes

**Best Practices:**

- Keep sitemap.xml under 50MB and 50,000 URLs
- Use absolute URLs (not relative)
- Include only public, indexable pages
- Keep `lastmod` dates accurate for better crawl prioritization
- Test robots.txt with [Google's robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)
