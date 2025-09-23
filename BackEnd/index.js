
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Ürün ekleme (fotoğraf yükleme ile)
app.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        categoryId: parseInt(categoryId)
      }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tüm ürünleri listele
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, variants: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
