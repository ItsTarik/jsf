import axios, { AxiosRequestConfig } from 'axios';
import { NextPageContext } from 'next';

export const createHttpClient = (cfg?: AxiosRequestConfig<unknown> | undefined, baseUrl = '') => {
  return {
    get: <T>(url: string) => axios.get<T>(`${baseUrl}${url}`, cfg).then((r) => r.data),
  };
};

export const createSSRHttpClient = (req: NextPageContext['req']) => {
  const protocol = req?.headers['x-forwarded-proto'] || 'http';
  const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

  return createHttpClient(undefined, baseUrl);
};

export const ssrRedirect = (destination: string) => ({
  redirect: {
    destination,
    permanent: false,
  },
});
