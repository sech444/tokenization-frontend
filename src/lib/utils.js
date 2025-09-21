// tokenization-frontend/src/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind + conditional classes
 * Example: cn("px-2", isActive && "bg-blue-500")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Frontend-safe file download utility
 * Creates a downloadable file in the browser
 */
export function downloadFile(content, filename, contentType = 'text/plain') {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Async version of downloadFile for consistency
 */
export async function downloadFileAsync(content, filename, contentType = 'text/plain') {
  return new Promise((resolve) => {
    downloadFile(content, filename, contentType);
    resolve();
  });
}

/**
 * Copy text to clipboard (modern browsers)
 */
export async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
