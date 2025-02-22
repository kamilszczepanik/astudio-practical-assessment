import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { extendedTheme } from "./extended-theme.ts";

export function getUserImgSrc(imageId?: string | null) {
  return imageId ? `/resources/user-images/${imageId}` : "/img/user.png";
}

export function getProductImgSrc(imageId: string) {
  return `/resources/product-images/${imageId}`;
}

export function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error;
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }
  console.error("Unable to get error message for error", error);
  return "Unknown Error";
}

function formatColors() {
  const colors = [];
  for (const [key, color] of Object.entries(extendedTheme.colors)) {
    if (typeof color === "string") {
      colors.push(key);
    } else {
      const colorGroup = Object.keys(color).map((subKey) =>
        subKey === "DEFAULT" ? "" : subKey
      );
      colors.push({ [key]: colorGroup });
    }
  }
  return colors;
}

const customTwMerge = extendTailwindMerge<string, string>({
  extend: {
    theme: {
      colors: formatColors(),
      borderRadius: Object.keys(extendedTheme.borderRadius),
    },
    classGroups: {
      "font-size": [
        {
          text: Object.keys(extendedTheme.fontSize),
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
