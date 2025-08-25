import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "@emotion/styled";
import { getAttributes, addAttribute, type Attribute } from "../api/attributes";
import { useForm, useFieldArray } from "react-hook-form";
import { t } from "i18next";

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
const Div = styled.div`
  text-align: -webkit-right;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 9999px;
  outline: none;
  font-size: 14px;
  transition: border 0.2s ease;

  &:focus {
    border-color: black;
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  border-radius: 9999px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid black;
  margin: 4px;
  background: ${({ variant }) => (variant === "secondary" ? "white" : "black")};
  color: ${({ variant }) => (variant === "secondary" ? "black" : "white")};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled.button`
  width: 42px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid #b5b5b5;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

type FormData = {
  name: string;
  values: { value: string }[];
};

export default function Attributes() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [adding, setAdding] = useState(false);

  const { register, control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { name: "", values: [{ value: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  const fetchData = async () => {
    try {
      const data = await getAttributes();
      setAttributes(data);
    } catch (err) {
      console.error("Failed to load attributes", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    const values = data.values.map((v) => v.value).filter(Boolean);
    if (!data.name || values.length === 0) {
      alert("Please enter a name and at least one value.");
      return;
    }
    try {
      await addAttribute(data.name, values);
      reset();
      setAdding(false);
      fetchData();
    } catch (err) {
      alert("Failed to add attribute");
    }
  };

  return (
    <Layout>
      <h2>{t("attr.Attributes")}</h2>

      {adding ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <Input {...register("name")} placeholder="Name" />
            <Input {...register("values.0.value")} placeholder="Value" />
          </div>

          {fields.slice(1).map((field, index) => (
            <div
              key={field.id}
              style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
            >
              <Input
                {...register(`values.${index + 1}.value`)}
                placeholder="Value"
              />
              <AddButton type="button" onClick={() => remove(index + 1)}>
                ❌
              </AddButton>
            </div>
          ))}

          <AddButton type="button" onClick={() => append({ value: "" })}>
            +
          </AddButton>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="secondary"
              type="button"
              onClick={() => setAdding(false)}
            >
              {t("global.cancel")}
            </Button>
            <Button type="submit">{t("global.save")}</Button>
          </div>
        </form>
      ) : (
        <Div>
          <Button onClick={() => setAdding(true)}>{t("attr.AddAttr")}</Button>
          <Table>
            <thead>
              <tr>
                <Th></Th>
                <Th>{t("attr.name")}</Th>
                <Th>{t("attr.values")}</Th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr, i) => (
                <tr key={attr.id}>
                  <Td>{i + 1}</Td>
                  <Td>{attr.name}</Td>
                  <Td>{attr.values.join(", ")}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Div>
      )}
    </Layout>
  );
}
