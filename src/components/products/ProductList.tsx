import styled from "@emotion/styled";
import type { Product } from "../../api/products";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  margin-top: 16px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #fafafa;
  border: 1px solid #eee;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #eee;
`;

const Button = styled.button`
  background: black;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 14px;
`;

const ActionBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  margin: 0 4px;
`;

type Props = {
  products: Product[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductList({
  products,
  loading,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={onAdd}>Add Product +</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Count of SKUs</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <Td colSpan={4}>No products found</Td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={p._id}>
                  <Td>{i + 1}</Td>
                  <Td>{p.name}</Td>
                  <Td>{p.skus?.length ?? 0}</Td>
                  <Td>
                    <ActionBtn onClick={() => onEdit(p)}>✏️</ActionBtn>
                    <ActionBtn onClick={() => onDelete(p._id)}>🗑</ActionBtn>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}
