import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

export const generateMetaTags = ({
  title,
  description,
  site_name,
  cid,
  baseUrl,
}: {
  title: string;
  description: string | null;
  site_name: string | null;
  cid: string;
  baseUrl: string;
}) => {
  const ogImageUrl = cid ? `${baseUrl}/api/get-og?cid=${cid}` : "";

  return `
<!-- HTML Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="${site_name}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${ogImageUrl}">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="${site_name}">
<meta property="twitter:url" content="${site_name}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${ogImageUrl}">
  `.trim();
};
