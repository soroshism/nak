import { useEffect, useState } from "react";
import ProductList from "../components/products/ProductList";
import ProductForm from "../components/products/ProductForm";
import { getProducts, deleteProduct, type Product } from "../api/products";
import Layout from "../components/layout/Layout";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(1, 10);
      setProducts(data.items);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleAdd = () => {
    setAdding(true);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setAdding(false);
  };

  const handleCancel = () => {
    setAdding(false);
    setEditingProduct(null);
  };

  return (
    <Layout>
      {adding || editingProduct ? (
        <ProductForm
          onCancel={handleCancel}
          onCreated={fetchProducts}
          initialProduct={editingProduct || undefined}
          editMode={!!editingProduct}
        />
      ) : (
        <ProductList
          products={products}
          loading={loading}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Layout>
  );
}
