# Engraved chess animation

Generated with the built-in image_gen tool. Layers are stored unchanged as PNGs; the release image is isolated by an SVG mask in index.html because its checkerboard was baked into the generated output.

- hand-grip.png: isolated engraved military sleeve and hand, natural empty pinch, sand skin interiors, almond camouflage, transparent background, no pawn or board.
- hand-release.png: same canvas and composition, thumb/index opened slightly; background-extraction pass requested transparent surroundings. The source needed a vector mask after generation.
- pawn.png: isolated full maroon Staunton pawn, fine engraved crosshatching, opaque interior and transparent surroundings.

The synchronized 12-second loop fades in, lifts the pawn from a cell, advances one rank, releases it, withdraws the hand, promotes the pawn to a queen, holds, fades the complete scene out, then restarts while invisible. A pause button, offscreen/page-visibility pause, reduced-motion static queen and failed-image fallback are supported.

The board is 8x8. Its equal-length projected axes are (86,-32) and (86,32), with origin (2,860). Start cell (.5,6.5) is (604,1052); destination (.5,7.5) is (690,1084). Visible figure bases are aligned to the destination using measured alpha bounds. Contact shadow stays on the board during the lift.

queen.png was generated with the built-in image_gen tool using this prompt:
Create a single isolated STAUNTON CHESS QUEEN on a genuinely transparent alpha PNG background, no checkerboard, no glow, no backdrop or shadow. Match a deep maroon #670001 engraved wooden chess pawn: fine black crosshatching, warm subtle highlights, realistic turned wood, refined memorial editorial illustration. Upright queen front view, crown with five small round finials, slender elegant tapered body, stacked collars and broad circular elliptical base. Full silhouette entirely within canvas. Square 1254x1254 composition, queen centered at x627, top y65, bottom of base y1178, widest base x350..904. No other objects, no text. Opaque figure interior. Restrained dark maroon, not bright red. Detailed etching style suitable for crossfading a pawn into a taller queen.
