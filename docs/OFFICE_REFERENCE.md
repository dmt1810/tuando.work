# Agent office visual reference

The owner selected [Pixel Agents](https://github.com/pixel-agents-hq/pixel-agents) as a visual reference for the office.

The office borrows the idea of a furnished pixel room: wood flooring, individual computer desks, plants, shelving and distinct characters. All room, workstation and character artwork in this project is original, generated from SVG shapes. No upstream code, sprites, furniture assets or third-party character pack has been copied.

The implementation keeps the original static Astro / DOM / TypeScript approach and nine profile roles. It introduces no React, canvas renderer, editor, telemetry or live-agent connection. The office describes capabilities; its animation does not represent live agent activity.

Room artwork is regenerated with `node scripts/build-office-art.mjs`. Character sheets and workstation SVGs are generated at build time by `src/components/office/sprites.ts` and `workstation.ts`. Only the current character animates, the brief passes between desks, and the loop pauses offscreen or when the page is hidden. Reduced-motion and Save-Data preferences keep the semantic role list visible.

Desktop and mobile use separate room compositions. Character buttons, role labels, keyboard links and the front-desk LinkedIn link remain accessible in both themes.

The visual update uses 16 × 24 maps instead of the seed plan's starter 8 × 12 maps, while preserving the same agent colors and small SVG budget. The scene retains the planned base aspect ratios, with a minimum height on narrow phones and tablets so labels and bubbles fit inside it. Both are reserved in CSS before the office initializes.
