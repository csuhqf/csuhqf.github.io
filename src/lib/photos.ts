import fs from 'fs';
import path from 'path';

const photosDirectory = path.join(process.cwd(), 'public/photos');

export function getPhotos() {
    if (!fs.existsSync(photosDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(photosDirectory);
    const photos = fileNames
        .filter((fileName) => /\.(jpg|jpeg|png|webp)$/i.test(fileName))
        .map((fileName) => {
            return {
                src: `/photos/${fileName}`,
                alt: fileName.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
            };
        });

    return photos;
}
