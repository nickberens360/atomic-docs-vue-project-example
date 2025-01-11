// api.ts
import axios, { type AxiosInstance } from 'axios';
import { setupCache, type AxiosCacheInstance } from 'axios-cache-interceptor';

interface AxiosConfig {
  allowCache?: boolean;
}

export type ApiInstance = AxiosInstance | AxiosCacheInstance;

export default (config?: AxiosConfig): ApiInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_MOCK_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });

  if (config?.allowCache) {
    return setupCache(instance);
  }

  return instance;
};