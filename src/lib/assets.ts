export const getAssetPath = (path: string) => {
  // Use import.meta.env.BASE_URL to handle base paths correctly in different environments
  let baseUrl = import.meta.env.BASE_URL || '/';
  
  // If baseUrl is './', it can cause issues with client-side routing on platforms like Vercel.
  // We prefer using an absolute path from the root.
  if (baseUrl === './') {
    baseUrl = '/';
  }
  
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${cleanBaseUrl}${cleanPath}`;
};
