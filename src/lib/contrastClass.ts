/** Maps stale CMS color classes to WCAG AA tokens used on the public site. */
export function contrastSafeClass(className: string): string {
  return className
    .replaceAll("#7C5CFC", "#5B3DE0")
    .replaceAll("text-emerald-600", "text-emerald-800");
}
