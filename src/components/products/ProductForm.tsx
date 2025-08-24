import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import AttributeSelector from "./AttributeSelector";
import SKUTable from "./SKUTable";
import { createProduct, updateProduct, type Product } from "../../api/products";
import { createSKU, getSKU, type SKU } from "../../api/products";

const Container = styled.div`
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
`;

const Input = styled.input`
  border-radius: 20px;
  padding: 12px;
  border: 1px solid #eee;
  width: 300px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  border-radius: 20px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  margin: 4px;

  ${({ variant }) =>
    variant === "secondary"
      ? `
        background: white;
        border: 1px solid black;
        color: black;
      `
      : `
        background: black;
        color: white;
      `}
`;

type Props = {
  onCancel: () => void;
  onCreated: () => void;
  initialProduct?: Product;
  editMode?: boolean;
};

export default function ProductForm({
  onCancel,
  onCreated,
  initialProduct,
  editMode,
}: Props) {
  const [name, setName] = useState(initialProduct?.name || "");
  const [attributes, setAttributes] = useState<
    { name: string; values: string[] }[]
  >(initialProduct?.attributes || []);
  const [skus, setSkus] = useState<
    { model: string; price: string; numberInStock: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (initialProduct) {
        setName(initialProduct.name);
        setAttributes(initialProduct.attributes || []);

        if (initialProduct.skus?.length) {
          const skuDetails: SKU[] = await Promise.all(
            initialProduct.skus.map((id) => getSKU(id))
          );
          setSkus(
            skuDetails.map((s) => ({
              model: s.model,
              price: s.price,
              numberInStock: s.numberInStock,
            }))
          );
        }
      }
    };

    loadData();
  }, [initialProduct]);

  const handleSave = async () => {
    if (!name || skus.length === 0) {
      alert("Please fill product name and SKUs.");
      return;
    }

    try {
      setLoading(true);

      const skuIds: string[] = [];
      for (const sku of skus) {
        const created = await createSKU({
          model: sku.model,
          price: String(sku.price),
          numberInStock: String(sku.numberInStock),
        });
        skuIds.push(created._id);
      }

      if (editMode && initialProduct) {
        await updateProduct(initialProduct._id, {
          name,
          attributes,
          skusIds: skuIds,
        });
      } else {
        await createProduct({
          name,
          attributes,
          skusIds: skuIds,
        });
      }

      alert(editMode ? "Product updated!" : "Product created!");
      onCreated();
      onCancel();
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h3>{editMode ? "Edit Product" : "Create Product"}</h3>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />

      <AttributeSelector
        attributes={attributes}
        setAttributes={setAttributes}
        setSkus={setSkus}
      />
      <SKUTable skus={skus} setSkus={setSkus} />

      <div style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : editMode ? "Update" : "Create"}
        </Button>
      </div>
    </Container>
  );
}
