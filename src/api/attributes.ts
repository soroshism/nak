import api from "./axios";

export type Attribute = {
  id: number;
  name: string;
  values: string[];
};

export const getAttributes = async () => {
  const res = await api.get<Attribute[]>("/attributes");
  return res.data;
};

export const getAttributeById = async (id: number) => {
  const res = await api.get<Attribute>(`/attributes/${id}`);
  return res.data;
};

export const addAttribute = async (name: string, values: string[]) => {
  const res = await api.post("/attributes", { name, values });
  return res.data;
};
