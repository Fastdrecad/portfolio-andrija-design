export const formatRouteName = (path: string): string => {
  if (path === "/") return "home";
  if (path === "/design-process") return "design process";
  return path.slice(1);
};
