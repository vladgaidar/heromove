# Perspective board and engraved pieces

Current piece assets: pawn-engraved.png and queen-engraved.png, generated with the built-in image_gen tool from the supplied engraving reference. Prompt: isolated warm charcoal chess piece with ivory/tan etched crosshatching, matte finish, full silhouette, no other objects or text. Queen uses the reference scalloped crown and ball finial. Cyan surroundings were removed where present; native alpha is preserved. Visible bounds determine sizing so both bases finish at (690,1084).

The board uses a one-point projective grid: t=row/8, width=700/(1-t/2), center x=772.352941; y=720+412.533333*t/(2-t). Near cells are larger than far cells. Start center (3.5,6.5)=(698.668731,1002.259649), destination (3.5,7.5)=(690,1084). Hand, piece and contact shadow share the same (8.668731,-81.740351) starting offset. Mobile centering no longer needs the old diamond-board correction.

Validated placement, release, withdrawal and promotion on 1280px and 390px viewports; partner layout also checked at 320px. Partner mark uses the user-supplied monochrome asset without a card background.

## Previous implementation notes

# Current hand sprites

- hand-grip-pixel.png and hand-release-pixel.png: complete 1536x1024 RGBA sprites generated with the built-in image_gen tool. These replace the old hand layers and separate sleeve overlay in the website.
- Generation prompt: matching engraved military hand grip/release poses, fine square digital camouflage in sand/olive/brown, fixed sleeve/wrist and canvas registration, no chess piece, clean full silhouette. Production sources requested a uniform cyan background after generated transparency produced a baked checkerboard. Cyan was converted to alpha with edge despill; no hand-drawn outline masks or sleeve clipping remain.
- Release edit prompt: preserve sleeve, wrist and upper hand; separate index/thumb tips slightly while retaining the natural pinch direction, with the same flat cyan surroundings.
- Grip/release crossfade is 120ms (41-42% of the 12-second loop) to avoid a prolonged double finger silhouette. Other animation timings and pawn/queen layers are unchanged.
- Browser verification: desktop 1280px and mobile 390px, sampled placement, release, withdrawal and promotion frames. No horizontal overflow or SVG contour masks.

## Archived implementation notes

# Engraved chess animation

Generated with the built-in image_gen tool. Layers are stored unchanged as PNGs; the release image is isolated by an SVG mask in index.html because its checkerboard was baked into the generated output.

- hand-grip.png: isolated engraved military sleeve and hand, natural empty pinch, sand skin interiors, almond camouflage, transparent background, no pawn or board.
- hand-release.png: same canvas and composition, thumb/index opened slightly; background-extraction pass requested transparent surroundings. The source needed a vector mask after generation.
- pawn.png: isolated full maroon Staunton pawn, fine engraved crosshatching, opaque interior and transparent surroundings.

The synchronized 12-second loop fades in, lifts the pawn from a cell, advances one rank, releases it, withdraws the hand, promotes the pawn to a queen, holds, fades the complete scene out, then restarts while invisible. A pause button, offscreen/page-visibility pause, reduced-motion static queen and failed-image fallback are supported.

The board is 8x8. Its equal-length projected axes are (86,-32) and (86,32), with origin (2,860). Start cell (.5,6.5) is (604,1052); destination (.5,7.5) is (690,1084). Visible figure bases are aligned to the destination using measured alpha bounds. Contact shadow stays on the board during the lift.

queen.png was generated with the built-in image_gen tool using this prompt:
Create a single isolated STAUNTON CHESS QUEEN on a genuinely transparent alpha PNG background, no checkerboard, no glow, no backdrop or shadow. Match a deep maroon #670001 engraved wooden chess pawn: fine black crosshatching, warm subtle highlights, realistic turned wood, refined memorial editorial illustration. Upright queen front view, crown with five small round finials, slender elegant tapered body, stacked collars and broad circular elliptical base. Full silhouette entirely within canvas. Square 1254x1254 composition, queen centered at x627, top y65, bottom of base y1178, widest base x350..904. No other objects, no text. Opaque figure interior. Restrained dark maroon, not bright red. Detailed etching style suitable for crossfading a pawn into a taller queen.

## Ukrainian pixel sleeve
hand-mm14.png was edited with the built-in image_gen tool. Prompt: replace only sleeve/cuff camouflage with Ukrainian MM-14 style angular digital pixel clusters in muted sand, grey olive, brown olive and dark earth; preserve engraved style, pose and 1536x1024 registration. The output has a baked checkerboard, so only the sleeve region is displayed, masked with the original grip alpha. One shared overlay keeps the camouflage consistent through grip and release without changing the original hand anatomy.

The shared hand-treatment group scales both poses to 86% around (690,850), preserving pawn contact. CSS grading returns a muted sand/grey tone. Rectangular top/right fade masks soften only the source canvas boundaries; no silhouette masks are used.
