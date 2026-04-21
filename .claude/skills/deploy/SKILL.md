---
name: deploy
description: Build and package the Alterion WordPress theme as a ZIP file for deployment
disable-model-invocation: true
---

# Deploy WordPress Theme

Package the Alterion Solar Warm WordPress theme as a production-ready ZIP file.

## Steps

1. **Verify theme files** — Check that all required WordPress theme files exist:
   - `style.css` (with theme header)
   - `functions.php`
   - `header.php`, `footer.php`
   - `front-page.php`, `index.php`
   - `screenshot.png`

2. **Check for PHP syntax errors** in all `.php` files:
   ```bash
   find "/Users/rivaldomacandrew/Desktop/alterrion theme/alterrion theme" -name "*.php" -exec php -l {} \;
   ```

3. **Remove development artifacts**:
   - `.DS_Store` files
   - Any `.map` files
   - Backup files (`*~`, `*.bak`)

4. **Create ZIP file**:
   ```bash
   cd "/Users/rivaldomacandrew/Desktop/alterrion theme"
   rm -f alterrion-theme.zip
   cd "alterrion theme"
   zip -r "../alterrion-theme.zip" . -x "*.DS_Store" -x "*__MACOSX*" -x "*.map"
   ```

5. **Report** the ZIP file size and location.

## Output

The ZIP file is created at: `/Users/rivaldomacandrew/Desktop/alterrion theme/alterrion-theme.zip`

Ready to upload via WordPress Admin → Themes → Add New → Upload Theme.
