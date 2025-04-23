export function extractArrayFilter(
  raw: string | string[] | undefined,
): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return raw.split(',').map((v) => v.trim());
}

export function regexArray(values: string[]): RegExp[] {
  return values.map((v) => new RegExp(`^${v}$`, 'i'));
}
