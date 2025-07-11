// hooks/use-construct-url.ts
import { env } from "@/lib/env";

/**
 * Constructs the full public URL for an uploaded asset stored in Tigris S3-compatible storage.
 * @param key - The key (path) of the uploaded file (e.g. "uploads/image-123.svg")
 * @returns The full URL to access the file publicly
 */
export function useConstructUrl(key: string): string {
  if (!key || typeof key !== "string") return "";

  const bucket = env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES;

  if (!bucket) {
    console.warn("S3 bucket name is missing from environment variables.");
    return "";
  }

  return `https://${bucket}.fly.storage.tigris.dev/${key}`;
}
