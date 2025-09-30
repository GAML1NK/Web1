import React, { useState } from "react";

export default function AdminPanel() {
  // Kargo ekleme için state ve fonksiyonlar
  const [kargoForm, setKargoForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [kargoMessage, setKargoMessage] = useState("");
  const handleKargoChange = (e) => {
    const { name, value } = e.target;
    setKargoForm({ ...kargoForm, [name]: value });
  };
  const handleKargoAdd = async (e) => {
    e.preventDefault();
    if (!kargoForm.name || !kargoForm.phone || !kargoForm.email || !kargoForm.address) {
      setKargoMessage("Tüm alanlar zorunlu.");
      return;
    }
    const res = await fetch("http://localhost:3001/kargos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kargoForm)
    });
    if (res.ok) {
      setKargoMessage("Kargo başarıyla eklendi!");
      setKargoForm({ name: "", phone: "", email: "", address: "" });
    } else {
      const err = await res.json();
      setKargoMessage(err.error || "Bir hata oluştu.");
    }
  };
  const [newCategory, setNewCategory] = useState("");
  const [catMessage, setCatMessage] = useState("");
  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setCatMessage("Kategori adı boş olamaz.");
      return;
    }
    // Kategori adındaki boşlukları kaldır
    const formattedName = newCategory.replace(/\s+/g, "");
    const res = await fetch("http://localhost:3001/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formattedName })
    });
    if (res.ok) {
      setCatMessage("Kategori başarıyla eklendi!");
      setNewCategory("");
      // Kategorileri tekrar çek
      fetch("http://localhost:3001/categories")
        .then(res => res.json())
        .then(data => setCategories(data));
    } else {
      const err = await res.json();
      setCatMessage(err.error || "Bir hata oluştu.");
    }
  };
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    image: null,
    variants: [{ color: "", size: "", stock: "" }],
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => {
        if (!res.ok) {
          console.error('Kategori API hatası:', res.status, res.statusText);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        console.log('Gelen kategoriler:', data);
        setCategories(data);
      })
      .catch((err) => {
        console.error('Kategori API fetch hatası:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleVariantChange = (idx, e) => {
    const { name, value, files } = e.target;
    const newVariants = [...form.variants];
    if (name === "stock") {
      newVariants[idx][name] = value === "" ? "" : Number(value);
    // Varyant fotoğrafı kaldırıldı
    } else {
      newVariants[idx][name] = value;
    }
    setForm({ ...form, variants: newVariants });
  };

  const addVariant = () => {
  setForm({ ...form, variants: [...form.variants, { color: "", size: "", stock: "" }] });
  };

  const removeVariant = (idx) => {
    const newVariants = form.variants.filter((_, i) => i !== idx);
    setForm({ ...form, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("categoryId", form.categoryId);
    if (form.image) data.append("image", form.image);
    // Varyant fotoğrafı kaldırıldı
    data.append("variants", JSON.stringify(form.variants));
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      setMessage("Ürün başarıyla eklendi!");
      setForm({
        name: "",
        description: "",
        categoryId: "",
        image: null,
        variants: [{ color: "", size: "", stock: "", image: null }],
      });
    } else {
      setMessage("Bir hata oluştu.");
    }
  };

  return (
    <div className="container mt-5 pt-5">   
      <h2>Kategori Ekle (Admin Panel)</h2>
      <form onSubmit={handleCategoryAdd} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Kategori Adı</label>
          <input type="text" className="form-control" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Kategori Ekle</button>
        {catMessage && <div className="mt-2 alert alert-info">{catMessage}</div>}
      </form>
      <h2>Ürün Ekle (Admin Panel)</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Ürün Adı</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Açıklama</label>
          <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select name="categoryId" className="form-select" value={form.categoryId} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Ürün Fotoğrafı</label>
          <input type="file" name="image" className="form-control" accept="image/*" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Varyantlar</label>
          {form.variants.map((variant, idx) => (
            <div key={idx} className="d-flex gap-2 mb-2 align-items-center">
              <input type="text" name="color" placeholder="Renk" className="form-control" value={variant.color} onChange={(e) => handleVariantChange(idx, e)} required />
              <input type="text" name="size" placeholder="Beden" className="form-control" value={variant.size} onChange={(e) => handleVariantChange(idx, e)} required />
              <input type="number" name="stock" placeholder="Stok" className="form-control" value={variant.stock} onChange={(e) => handleVariantChange(idx, e)} required />
              {/* Varyant fotoğrafı kaldırıldı */}
              {form.variants.length > 1 && <button type="button" className="btn btn-danger" onClick={() => removeVariant(idx)}>Sil</button>}
            </div>
          ))}
          <button type="button" className="btn btn-secondary mt-2" onClick={addVariant}>Varyant Ekle</button>
        </div>
        <button type="submit" className="btn btn-primary">Ürün Ekle</button>
      </form>
      <h2>Kargo Ekle (Admin Panel)</h2>
       <form onSubmit={handleKargoAdd} className="mb-4">
   <div className="mb-3">
     <label className="form-label">Kargo Adı</label>
     <input type="text" className="form-control" name="name" value={kargoForm.name} onChange={handleKargoChange} required />
   </div>
   <div className="mb-3">
     <label className="form-label">Telefon</label>
     <input type="text" className="form-control" name="phone" value={kargoForm.phone} onChange={handleKargoChange} required />
   </div>
   <div className="mb-3">
     <label className="form-label">Email</label>
     <input type="email" className="form-control" name="email" value={kargoForm.email} onChange={handleKargoChange} required />
   </div>
   <div className="mb-3">
     <label className="form-label">Adres</label>
     <input type="text" className="form-control" name="address" value={kargoForm.address} onChange={handleKargoChange} required />
   </div>
   <button type="submit" className="btn btn-success">Kargo Ekle</button>
   {kargoMessage && <div className="mt-2 alert alert-info">{kargoMessage}</div>}
 </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}
