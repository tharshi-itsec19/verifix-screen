# VerifiX Interactive Screen

A clickable, touch-friendly screen for large displays and demos. White theme with VerifiX blue and orange, using the VerifiX fonts (Archivo, Inter, JetBrains Mono).

**Screens**
1. Cover: tap the core to open
2. Regulator hub: VARA, CBUAE, CMA, DFSA, FSRA around the core (zoom and full screen controls)
3. Popup with three slides per regulator: Overview, What is configured, Evidence and audit

Stack: React 18 + Vite. No other dependencies.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs ./dist
```

Add `?kiosk` to the URL (for example `https://yourname.github.io/verifix-screen/?kiosk`) and the screen returns to the cover after 90 seconds without a touch.

## Change the content

All text lives in `src/data.js`. Add or edit a regulator there and the hub and popup update. If you add a sixth regulator, add an angle to `ANGLES` in `src/Hub.jsx`.

Colours and fonts are CSS variables at the top of `src/styles.css`.

## Put it on GitHub and publish it

1. Create an empty repo on github.com, for example `verifix-screen`.
2. In this folder:
   ```bash
   git init
   git add .
   git commit -m "VerifiX interactive screen"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/verifix-screen.git
   git push -u origin main
   ```
3. On GitHub open Settings, then Pages, and set Source to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
   Your site appears at `https://YOUR-USERNAME.github.io/verifix-screen/`.

## Credits

Hero artwork and logo are VerifiX brand assets from verifix.ae. Regulator names describe the journeys VerifiX supports and do not imply endorsement, approval, or affiliation.
