// This is an slug generator, which help to convert a name/title or string (including white-spaces) to a slug,
// that can be used in link, to make seo friendly url

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")         // Replace & with 'and'
    .replace(/\s+/g, "-")         // Replace spaces with -
    .replace(/[^\w-]+/g, "")      // Remove all non-word chars (like brackets)
    .replace(/--+/g, "-");        // Replace multiple - with single -
};