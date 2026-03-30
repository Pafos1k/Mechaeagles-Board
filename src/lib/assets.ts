export const getAssetPath = (path: string) => {
  const base = (import.meta as any).env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure we don't have double slashes if base ends with / and cleanPath starts with /
  const finalBase = base.endsWith('/') ? base : `${base}/`;
  return `${finalBase}${cleanPath}`;
};
