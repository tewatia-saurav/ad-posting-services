import axios from "axios";

interface NEW_AD {
  title: string;
  description: string;
  img: string;
  price: number;
  category: string;
}

export const getAllAds = async () => {
  return await axios.get(`/api/ads/getAll`);
};

export const getAdsByCategory = async (category: string) => {
  return await axios.post('/api/ads/getByCategory', {category})
}

export const getAllAdsOfLoggedInUser = async (token: any) => {
  return await axios.post(`/api/ads/getByUser`, {
    token,
  });
};
export const getAllAdsOfLoggedInUserByCategory = async (token: any, category: string) => {
  return await axios.post(`/api/ads/getByUserCategory`, {
    token,
    category
  });
};

export const createNewAd = async (ad: NEW_AD, token: any) => {
  const res = await axios.post(`/api/ads/create`, {
    ad,
    token,
  });
};

export const deleteAdById = async (_id: string) => {
  return await axios.post(`/api/ads/delete`, {
    _id,
  });
};
