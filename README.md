# Tower of Hanoi

A modern Tower of Hanoi puzzle site built with **Vue 3 + TypeScript + Vite**, designed to run as a fully static app on **GitHub Pages**.

Live site (GitHub Pages): https://gregpuzzles1.github.io/tower_hanoi/

## Controls

- **Mouse / touch**: click/tap a source tower, then a destination tower
- **Keyboard**:
  - `1` / `2` / `3` select source tower
  - `Left` / `Right` change destination focus
  - `Enter` / `Space` drop to focused tower
  - `Esc` cancel selection

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Notes

- Vite is configured for project-pages base path `/tower_hanoi/`.
- Vue Router uses hash history to avoid GitHub Pages deep-link 404s.

## License

MIT License. See [LICENSE](LICENSE).
