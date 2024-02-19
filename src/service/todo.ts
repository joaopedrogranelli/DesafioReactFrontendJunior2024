import axios, { AxiosResponse } from "axios";
import { Dados } from "../model/model";

const apiUrl =
  "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos";

const apiService = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTodos = (): Promise<Dados[]> => {
  return apiService
    .get(apiUrl)
    .then((response: AxiosResponse<Dados[]>) => response.data)
    .catch((error: Error) => {
      throw error;
    });
};
