import React from "react";
import { Link } from "react-router-dom";

// ProductCard bileşeni: Bir ürünü kart şeklinde gösterir
// id, name, price, img props olarak alınır
export default function ProductCard({ id = 1, name, price, img }) {
	return (
		<div className="card h-100">
			{/* Ürün görseli */}
			<img
				src={img}
				className="card-img-top w-100"
				alt={name}
				style={{ height: "350px", objectFit: "cover" }}
			/>
			<div className="card-body">
				{/* Ürün adı */}
				<h5 className="card-title">{name}</h5>
				{/* Ürün fiyatı */}
				<p className="card-text">{price}</p>
				{/* Detay sayfasına yönlendiren buton */}
				<Link to={`/urun/${id}`} className="btn btn-primary">
					Ürünü Gör
				</Link>
			</div>
		</div>
	);
}
