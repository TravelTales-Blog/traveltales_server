const express = require('express');
const csrfProtection = require('../middleware/csrfAuth');
const authenticateJWT = require('../middleware/jwtAuth');
const { upload } = require('../utils/uploadImageUtil');

const router = express.Router();

router.use(csrfProtection);
router.use(authenticateJWT);

router.post(
    '/image',
    upload.single('image'),
    (req, res) => {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ image_url: imageUrl });
    }
);

module.exports = router;
