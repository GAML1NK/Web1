const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Kargo CRUD
app.get('/kargos', async (req, res) => {
	try {
		const kargos = await prisma.kargo.findMany();
		res.json(kargos);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.post('/kargos', async (req, res) => {
	try {
		const { name, phone, email, address } = req.body;
		if (!name || !phone || !email || !address) {
			return res.status(400).json({ error: 'Tüm alanlar zorunlu.' });
		}
		const kargo = await prisma.kargo.create({ data: { name, phone, email, address } });
		res.status(201).json(kargo);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Multer ayarları (ana fotoğraf + varyant fotoğrafları)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Ürün ekleme (ana fotoğraf + varyant fotoğrafları + bilgiler)
app.post('/products', upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'variantImages', maxCount: 10 }
]), async (req, res) => {
	try {
		const { name, description, categoryId, variants } = req.body;
		const imageUrl = req.files['image'] && req.files['image'][0] ? `/uploads/${req.files['image'][0].filename}` : null;
		const variantImages = req.files['variantImages'] || [];
		let variantList = JSON.parse(variants || '[]');
		// Varyantlardan image alanı kaldırıldı
		variantList = variantList.map(({ color, size, stock }) => ({ color, size, stock }));
		// Ürün oluştur
		const product = await prisma.product.create({
			data: {
				name,
				description,
				imageUrl,
				categoryId: parseInt(categoryId),
				variants: variantList.length > 0 ? {
					create: variantList
				} : undefined
			},
			include: { variants: true }
		});
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Tüm ürünleri kategorize şekilde listele
app.get('/products', async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			include: { category: true, variants: true }
		});
		// Kategorilere göre gruplama
		const categorized = {};
		products.forEach(product => {
			const cat = product.category.name;
			if (!categorized[cat]) categorized[cat] = [];
			categorized[cat].push(product);
		});
		res.json(categorized);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Tüm kategorileri listele
app.get('/categories', async (req, res) => {
	try {
		const categories = await prisma.category.findMany();
		res.json(categories);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Yeni kategori ekleme
app.post('/categories', async (req, res) => {
	try {
		const { name } = req.body;
		if (!name || name.trim() === "") {
			return res.status(400).json({ error: "Kategori adı gerekli." });
		}
		const category = await prisma.category.create({ data: { name } });
		res.status(201).json(category);
	} catch (error) {
		if (error.code === 'P2002') {
			res.status(409).json({ error: "Bu isimde bir kategori zaten var." });
		} else {
			res.status(500).json({ error: error.message });
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
