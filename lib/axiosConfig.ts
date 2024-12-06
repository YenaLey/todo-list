import axios from "axios";

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api/${tenantId}`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
