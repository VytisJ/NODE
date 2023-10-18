import axios from "axios";
import { API } from "./const";

export const fetchAds = async () => {
  const response = await axios.get(`${API}/ads`);
  return response.data;
};

export const fetchAd = async (id) => {
  const response = await axios.get(`${API}/ads/${id}`);
  return response.data;
};

export const createAd = async (ad) => {
  const response = await axios.post(`${API}/ads`, ad);
  return response.data;
};

export const updateAd = async (ad) => {
  const { id, ...rest } = ad;
  const response = await axios.put(`${API}/ads/${id}`, rest);
  return response.data;
};

export const deleteAd = async (id) => {
  const response = await axios.delete(`${API}/ads/${id}`);
  return response.data;
};
