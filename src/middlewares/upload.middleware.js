const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

const uploadDir = path.join(__dirname, "../../uploads/products");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    if (extOk && mimeOk) return cb(null, true);
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)."));
};

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, "product-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const memoryStorage = multer.memoryStorage();

const useCloudinary = isCloudinaryConfigured();

const uploadProductImage = multer({
    storage: useCloudinary ? memoryStorage : diskStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
});

const cloudinaryUploadMiddleware = async (req, res, next) => {
    if (!useCloudinary || !req.file) return next();
    try {
        const b64 = req.file.buffer.toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "crm/products",
            resource_type: "image",
        });
        req.file.cloudinaryUrl = result.secure_url;
        req.file.cloudinaryPublicId = result.public_id;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadProductImage,
    cloudinaryUploadMiddleware,
    isCloudinaryEnabled: () => useCloudinary,
};
