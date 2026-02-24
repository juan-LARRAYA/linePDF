import * as FileSystem from 'expo-file-system';

const PDF_DIR = FileSystem.documentDirectory + 'pdfs/';

export async function ensurePdfDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(PDF_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(PDF_DIR, { intermediates: true });
  }
}

export async function copyPdfToStorage(sourceUri: string, filename: string): Promise<string> {
  await ensurePdfDir();
  // Sanitize filename to avoid path issues
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const destUri = PDF_DIR + safe;
  // If it already exists (same file opened again), skip copy
  const existing = await FileSystem.getInfoAsync(destUri);
  if (!existing.exists) {
    await FileSystem.copyAsync({ from: sourceUri, to: destUri });
  }
  return destUri;
}
