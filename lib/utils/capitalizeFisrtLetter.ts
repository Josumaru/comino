export const capitalizeFirstLetter = (text: string | undefined) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
