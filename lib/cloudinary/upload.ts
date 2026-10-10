const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
export async function uploadToCloudinary(file: File, folder: string = "players"): Promise<string | null> {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        console.error("Cloudinary config missing");
        return null;
    }
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", folder);
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: formData }
        );
        const data = await res.json();
        return data.secure_url || null;
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        return null;
    }
}
