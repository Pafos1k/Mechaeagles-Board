export const getAssetPath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Ensure the path doesn't start with leading slashes or dots
  const cleanPath = path.replace(/^(\.\/|\.\.\/|\/)+/, '');
  
  // Return absolute path from root as requested ("just slash")
  return `/${cleanPath}`;
};
