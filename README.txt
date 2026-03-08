TRALALA / GITHUB PAGES FIX

DIESE DATEIEN SIND FÜR:
- GitHub Pages
- Repo-Unterordner / Project Site
- Custom Domain oder github.io

WICHTIG:
Alle Pfade sind RELATIV gebaut:
./style.css
./script.js
./assets/background.mp4

SO BENUTZT DU ES:
1. Diese Dateien in dein Repo /trulala bzw. in den veröffentlichten Pages-Ordner legen
2. In index.html ersetzen:
   - PASTE_YOUR_CA_HERE
   - X Link
   - TikTok Link
3. Dein Video hier reinlegen:
   assets/background.mp4
4. In GitHub:
   Settings -> Pages
   Source -> Deploy from a branch
   Branch -> main
   Folder -> / (root)
5. Falls GitHub Actions / Jekyll Probleme macht:
   .nojekyll Datei im Root drin lassen

WENN DU EINE CUSTOM DOMAIN HAST:
- Prüfe in Settings -> Pages, ob dort die richtige Domain eingetragen ist
- Falls dein USER-SITE-Repo eine Domain nutzt, läuft ein Project-Repo standardmäßig oft unter:
  DEINE-DOMAIN/REPO-NAME
- Also z. B. nicht nur / sondern /tralala

DATEIEN IN DIESEM PAKET:
- index.html
- style.css
- script.js
- .nojekyll
- assets/PUT-YOUR-VIDEO-HERE.txt
