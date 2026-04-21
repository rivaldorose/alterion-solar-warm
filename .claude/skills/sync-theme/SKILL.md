---
name: sync-theme
description: Detect differences between Next.js source and WordPress theme, then sync changes
disable-model-invocation: true
---

# Sync Next.js Design → WordPress Theme

Compare the original Next.js site with the WordPress theme and sync any differences.

## Source directories

- **Next.js (source of truth)**: `/Users/rivaldomacandrew/Desktop/Alterion Solar Warm/`
- **WordPress theme (target)**: `/Users/rivaldomacandrew/Desktop/alterrion theme/alterrion theme/`

## File mapping

| Next.js File | WordPress File |
|---|---|
| `app/page.tsx` | `front-page.php` |
| `app/over-ons/page.tsx` | `page-over-ons.php` |
| `app/diensten/page.tsx` | `page-diensten.php` |
| `app/contact/page.tsx` | `page-contact.php` |
| `app/webshop/page.tsx` | `woocommerce.php` (shop section) |
| `app/webshop/[slug]/page.tsx` | `woocommerce.php` (product section) |
| `components/Header.tsx` | `header.php` |
| `components/Footer.tsx` | `footer.php` |
| `app/globals.css` | `style.css` |

## Process

1. Read each Next.js file and its WordPress counterpart
2. Compare text content, layout structure, CSS classes
3. List all differences found
4. Ask user which differences to sync
5. Apply approved changes to the WordPress theme files
6. Verify PHP syntax after changes: `php -l <file>`

## Rules

- Never change Next.js files — WordPress is the target
- Preserve all `alterion_t()` translation calls in WordPress
- Preserve all `alterion_url()` calls for language-aware links
- Keep WooCommerce integration intact
- Only sync visual/structural differences, not framework-specific code
