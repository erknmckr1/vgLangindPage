import axiosInstance from "../../../../lib/axios";
import { BillingAccount } from "../types/billing";

// GET tüm hesaplar
export const getBillingAccounts = async (): Promise<BillingAccount[]> => {
  const res = await axiosInstance.get("/billing-info");
  return res.data;
};

// POST yeni hesap
export const createBillingAccount = async (
  payload: Omit<BillingAccount, "id">,
) => {
  const res = await axiosInstance.post(
    `${process.env.INTERNAL_USER_API_URL}/billing-info`,
    payload,
  );
  return res.data;
};

// PUT (birincil hesap olarak güncelle)
export const setPrimaryAccount = async (id: string) => {
  const res = await axiosInstance.put(
    `${process.env.INTERNAL_USER_API_URL}/billing-info/${id}/set-primary`,
  );
  return res.data;
};

// DELETE hesap sil
export const deleteBillingAccount = async (id: string) => {
  const res = await axiosInstance.delete(
    `${process.env.INTERNAL_USER_API_URL}/billing-info/${id}`,
  );
  return res.data;
};
