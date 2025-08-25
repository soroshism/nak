import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getAttributes } from "../../api/attributes";
import { t } from "i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
`;

const SelectWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 9999px;
  background: white;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  cursor: pointer;
`;

const RemoveBtn = styled.button`
  border: 1px solid red;
  background: white;
  color: red;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #ffecec;
  }
`;

const AddBtn = styled.button`
  border: 1px solid black;
  background: white;
  border-radius: 9999px;
  // padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  width: 36px;
  height: 36px;

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 9999px;
  background: white;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f5f5f5;
  }

  input {
    margin-right: 8px;
  }
`;

type MultiSelectProps = {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
};

function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleValue = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <DropdownWrapper>
      <DropdownButton type="button" onClick={() => setOpen(!open)}>
        {selected.length > 0 ? selected.join(", ") : "Values"}
      </DropdownButton>

      {open && (
        <DropdownList>
          {options.map((opt) => (
            <Option key={opt}>
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleValue(opt)}
              />
              {opt}
            </Option>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
}

type Props = {
  attributes: { name: string; values: string[] }[];
  setAttributes: React.Dispatch<
    React.SetStateAction<{ name: string; values: string[] }[]>
  >;
  setSkus: React.Dispatch<
    React.SetStateAction<
      { model: string; price: number; numberInStock: number }[]
    >
  >;
};

export default function AttributeSelector({
  attributes,
  setAttributes,
  setSkus,
}: Props) {
  const [allAttributes, setAllAttributes] = useState<
    { id: number; name: string; values: string[] }[]
  >([]);
  const [selectedAttr, setSelectedAttr] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    getAttributes().then(setAllAttributes);
  }, []);

  const generateCombinations = (
    attrs: { name: string; values: string[] }[]
  ) => {
    if (attrs.length === 0) return [];

    const combine = (arr: string[][]): string[][] =>
      arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [[]]);

    const valuesArray = attrs.map((a) => a.values);
    return combine(valuesArray).map((combo) => combo.join(" / "));
  };

  const addAttr = () => {
    if (!selectedAttr || selectedValues.length === 0) return;

    if (attributes.some((a) => a.name === selectedAttr)) {
      alert(`${selectedAttr} already added.`);
      return;
    }

    const newAttrs = [
      ...attributes,
      { name: selectedAttr, values: selectedValues },
    ];
    setAttributes(newAttrs);

    const combos = generateCombinations(newAttrs);
    setSkus(combos.map((c) => ({ model: c, price: 0, numberInStock: 0 })));

    setSelectedAttr("");
    setSelectedValues([]);
  };

  const removeAttr = (name: string) => {
    const newAttrs = attributes.filter((a) => a.name !== name);
    setAttributes(newAttrs);

    const combos = generateCombinations(newAttrs);
    setSkus(combos.map((c) => ({ model: c, price: 0, numberInStock: 0 })));
  };

  const availableAttributes = allAttributes.filter(
    (a) => !attributes.some((attr) => attr.name === a.name)
  );

  const selectedAttrObj = availableAttributes.find(
    (a) => a.name === selectedAttr
  );

  return (
    <div>
      <Container>
        {attributes.map((attr, i) => (
          <Row key={i}>
            <SelectWrapper>
              <Label>{t("attr.AttributesName")}</Label>
              <Select value={attr.name} disabled>
                <option>{attr.name}</option>
              </Select>
            </SelectWrapper>

            <SelectWrapper>
              <Label>{t("attr.AttributesValue")}</Label>
              <Select disabled>
                <option>{attr.values.join(", ")}</option>
              </Select>
            </SelectWrapper>

            <RemoveBtn onClick={() => removeAttr(attr.name)}>🗑</RemoveBtn>
          </Row>
        ))}

        <Row>
          <SelectWrapper>
            <Label>{t("attr.AttributesName")}</Label>
            <Select
              value={selectedAttr}
              onChange={(e) => setSelectedAttr(e.target.value)}
            >
              <option value="">Attribute</option>
              {availableAttributes.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </Select>
          </SelectWrapper>

          <SelectWrapper>
            <Label>{t("attr.AttributesValue")}</Label>
            <MultiSelect
              options={selectedAttrObj?.values || []}
              selected={selectedValues}
              onChange={setSelectedValues}
            />
          </SelectWrapper>

          <AddBtn onClick={addAttr}>+</AddBtn>
        </Row>
      </Container>
    </div>
  );
}
