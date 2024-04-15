export function convertStringToId(x: string): string {
  return x.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
