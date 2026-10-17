// Translucent version of a CSS color. Works with var(--neon-*) values, where the
// template's `${color}15` hex-alpha suffix produced invalid CSS.
export function tint(color: string, alpha: number) {
  return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}
