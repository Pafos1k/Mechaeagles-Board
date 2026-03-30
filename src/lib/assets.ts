export const getAssetPath = (path: string) => {
  // Ensure path starts with a single leading slash for absolute resolution from root
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
};
