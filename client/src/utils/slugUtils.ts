export const generateSlug = (projectName: string): string => {
  return projectName.toLowerCase().replace(/\s+/g, "-");
};
