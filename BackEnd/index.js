

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer ayarları (fotoğraf upload)
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, 'uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

// Ürün ekleme (fotoğraf + bilgiler)
app.post('/products', upload.single('image'), async (req, res) => {
	try {
		const { name, description, categoryId, variants } = req.body;
		const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
		// Ürün oluştur
		const product = await prisma.product.create({
			data: {
				name,
				description,
				imageUrl,
				categoryId: parseInt(categoryId),
				variants: variants ? {
					create: JSON.parse(variants) // [{color, size, stock}, ...]
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

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
