PROJECT MEDIA — drop your files here
=====================================

Put each project's image (and optional demo video) in this folder using the
exact filename below. The names are already wired up in js/data.js, so you
don't have to touch any code — just add the files and refresh the page.

Until a file exists, the card automatically falls back to the generated SVG
artwork, so nothing ever looks broken.

PROJECT IMAGES (recommended: .jpg or .webp, landscape, ~1200x750 / 16:10)
  viad.jpg       -> VIAD Smart Glasses
  pharmacy.jpg   -> Pharmacy App
  budget.jpg     -> Budget Tracker
  cleaner.jpg    -> Folder Cleaner

MORE-BUILDS IMAGES (used as the row thumbnail + popup image; square-ish is fine)
  mosques.jpg     -> Mosques Management
  tictactoe.jpg   -> Tic-Tac-Toe
  filecleaner.jpg -> File Cleaner (CS315)

EXTRA POPUP IMAGES (carousel) — optional, the CARD always shows the single `img`
  The popup shows a left/right carousel of: the demo video (if any), then `img`,
  then any extra images you list in the project's `gallery:[ ]` array in js/data.js.
  Suggested naming (any names work, just match the gallery paths):
      viad-2.png, viad-3.png        -> extra VIAD images
      pharmacy-2.png, ...           -> extra Pharmacy images
  Then in js/data.js:  gallery:["assets/projects/viad-2.png","assets/projects/viad-3.png"]

VIDEO (optional demo of the project working, shown as the first carousel slide)
  viad-demo.mp4  -> short, MUTED, will auto-loop. Keep it small (a few MB).
                    Tip: trim to ~10-20s and compress for fast loading.

CHANGING / ADDING LINKS
  Open js/data.js. Each project has a `links` block:
      links:{ github:"...", website:"", download:"" }
  - website  : a deployed site -> shows a "Visit site" button
  - download : an app (APK file or App Store / Play Store URL) -> "Download app" button
  Leave a field as "" to hide its button.

  To add a demo video to another project, add:  video:"assets/projects/yourfile.mp4"
  To use a different image filename, change the `img:` path for that project.
