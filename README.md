# SlothScape Mock Site

This repository hosts a mock landing page for SlothScape, suitable for GitHub Pages.

How to publish on GitHub Pages:
1. Add `index.html` to the repository root and commit to your default branch (typically `main`).
2. Go to Settings → Pages:
   - Source: Deploy from a branch
   - Branch: `main` (or your default) and folder: `/root`.
3. Your site will be live at `https://<your-username>.github.io/<repository-name>/`.
   - For this repo: https://slothuim.github.io/slothscape-site/

Local preview:
- Open `index.html` directly in a browser or serve locally:
  ```bash
  python3 -m http.server 8000
  # then open http://localhost:8000/index.html
  ```

Customizations:
- Replace the “Join Discord” and “Download Client” button actions with your real links.
- Adjust colors in the `:root { ... }` CSS variables.
- Swap mock News/Features/Highscores with live content or your API.
