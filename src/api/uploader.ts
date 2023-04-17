export async function uploadImage(file: File | undefined) {
    if (
        !process.env.REACT_APP_CLOUDINARY_URL ||
        !process.env.REACT_APP_CLOUDINARY_PRESET
    ) {
        console.error(
            'REACT_APP_CLOUDINARY_URL or REACT_APP_CLOUDINARY_PRESET is not defined'
        );
        return null;
    }
    const data = new FormData();
    if (file) {
        data.append('file', file);
    }
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    try {
        const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
            method: 'POST',
            body: data,
        });

        const jsonData = await response.json();
        return jsonData.url;
    } catch (error) {
        console.error('이미지 업로드 실패...', error);
        return null;
    }
}
