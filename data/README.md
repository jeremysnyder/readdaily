Publishing a Tagged Release to GitHub Pages:

Tagging the repository (e.g., `2026`) and pushing the tag triggers `.github/workflows/deploy-tag.yml`, which builds the app with `--base=/readdaily/<tag>/` and publishes it to `https://jeremysnyder.github.io/readdaily/<tag>/` on the `gh-pages` branch (while preserving previously published tags):

git tag 2026
git push origin 2026
