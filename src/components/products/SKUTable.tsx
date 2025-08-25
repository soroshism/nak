import styled from "@emotion/styled";
import { t } from "i18next";

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  background: white;
`;

const Th = styled.th`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const RemoveBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
`;

type SKU = { model: string; price: string; numberInStock: string };

type Props = {
  skus: SKU[];
  setSkus: React.Dispatch<React.SetStateAction<SKU[]>>;
};

export default function SKUTable({ skus, setSkus }: Props) {
  const updateSKU = (index: number, field: keyof SKU, value: string) => {
    const updated = [...skus];
    updated[index][field] = value;
    setSkus(updated);
  };

  const removeSKU = (index: number) => {
    const updated = skus.filter((_, i) => i !== index);
    setSkus(updated);
  };

  return (
    <div>
      <h4>{t("sku.list")}</h4>
      {skus.length === 0 ? (
        <p>{t("sku.notFound")}</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th></Th>
              <Th>{t("sku.model")}</Th>
              <Th>{t("sku.price")}</Th>
              <Th>{t("sku.inStock")}</Th>
              <Th>{t("sku.action")}</Th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{sku.model}</Td>
                <Td>
                  <input
                    type="number"
                    placeholder="Price"
                    value={sku.price || ""}
                    onChange={(e) =>
                      updateSKU(i, "price", Number(e.target.value))
                    }
                  />
                </Td>
                <Td>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={sku.numberInStock || ""}
                    onChange={(e) =>
                      updateSKU(i, "numberInStock", Number(e.target.value))
                    }
                  />
                </Td>
                <Td>
                  <RemoveBtn onClick={() => removeSKU(i)}>❌</RemoveBtn>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
