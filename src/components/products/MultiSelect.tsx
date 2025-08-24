import { useState } from "react";
import styled from "@emotion/styled";

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

export function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
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
      <DropdownButton onClick={() => setOpen(!open)}>
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
