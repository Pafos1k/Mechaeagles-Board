export const getAssetPath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Use import.meta.env.BASE_URL but ensure it's absolute
  let baseUrl = import.meta.env.BASE_URL || '/';
  if (baseUrl === './') baseUrl = '/';
  
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.replace(/^(\.\/|\.\.\/|\/)+/, '');
  
  // Encode the path to handle spaces and special characters
  return encodeURI(`${cleanBaseUrl}${cleanPath}`);
};
