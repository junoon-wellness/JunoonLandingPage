/**
 * The words on a class's 2 minute preview on /library's Videos tab (Arnav,
 * Sun 22 Nov 2026: "I like how these video are provided to the user. I want to
 * copy the same style and also cap our videos at 2 minutes").
 *
 * Draft words for Arjav (Arnav, 22 Nov 2026)
 */
export const PREVIEW_WORDS = {
  /** The pill at the player's top-left. `minutes` is the full class length. */
  pill: (minutes: number) =>
    `You're previewing 2 minutes of this class. Members practice the full ${minutes} minutes.`,
  /** The button inside the pill and on the end card. */
  button: "Get the full class",
  /** The end card's line, once the preview stops at 2:00. */
  endCard: "That's the 2 minute preview.",
};
