// src/api/insurance.ts
import axios from "axios";
import type { Insurance, InsuranceFormInputs } from "../types/types";

export const fetchInsurances = async (): Promise<Insurance[]> => {
  const res = await axios.get("/api/insurance");
  return res.data;
};

export const addInsurance = async (data: InsuranceFormInputs) => {
  const sanitized = {
    ...data,
    description: data.description.replace(/[<>]/g, ""),
  };
  const res = await axios.post("/api/insurance", sanitized);
  return res.data;
};

export const updateInsurance = async (data: Insurance): Promise<void> => {
  await axios.put(`/api/insurance/${data.id}`, data);
};

export const deleteInsurance = async (id: number) => {
  await axios.delete(`/api/insurance/${id}`);
};
