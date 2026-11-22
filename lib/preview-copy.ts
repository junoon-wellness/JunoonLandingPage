/**
 * The words on a class's 60 second preview on /library's Videos tab (Arnav,
 * Sun 22 Nov 2026: "I like how these video are provided to the user. I want to
 * copy the same style"; length per Kush's D1 pick, "60 seconds confirmed").
 *
 * Draft words for Arjav (Arnav, 22 Nov 2026)
 */
export const PREVIEW_WORDS = {
  /** The pill at the player's top-left. `minutes` is the full class length. */
  pill: (minutes: number) =>
    `You're previewing 1 minute of this class. Members practice the full ${minutes} minutes.`,
  /** The button inside the pill and on the end card. */
  button: "Get the full class",
  /** The end card's line, once the preview stops at 1:00. */
  endCard: "That's the 1 minute preview.",
};
