export const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(
    regex,
    `<mark class="bg-custom-yellow rounded-sm">$1</mark>`
  );
};
