/**
 * Client-side image compression tool.
 * Scales down large camera/phone photos to max 1280px dimension and compresses with quality 0.82.
 * This keeps memory and loading times super snappy while preserving crisp vehicle details.
 */
export async function compressImage(file: File, maxDimension: number = 1280, quality: number = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try webp or jpeg fallback
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(canvas.toDataURL('image/png'));
        }
      };
      img.onerror = () => {
        reject(new Error('Kon afbeelding niet inladen.'));
      };
    };
    reader.onerror = () => {
      reject(new Error('Fout bij het lezen van het bestand.'));
    };
  });
}
