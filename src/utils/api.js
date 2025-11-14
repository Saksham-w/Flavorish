/**
 * Get the base URL for API calls
 * Works in both server and client components
 */
export const getBaseUrl = () => {
  // Client-side
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
  }

  // Server-side
  // In production (Vercel), use VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Use custom base URL if set
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Default to localhost for development
  return "http://localhost:3000";
};
