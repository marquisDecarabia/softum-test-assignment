import axios, { AxiosRequestConfig } from "axios";
import { Handlers } from "../helpers/handlers";
import { ResponseErrorHandler, ResponseSuccessHandler } from "./types";

const Url = "https://api.privatbank.ua/p24api";

export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export class ServiceBase {
  static GetConfig(method: Method, baseURL?: string): AxiosRequestConfig {
    return {
      method,
      baseURL,
    };
  }

  static async callApi(
    config: AxiosRequestConfig,
    url: string,
    onSuccess: ResponseSuccessHandler<any>,
    onError?: ResponseErrorHandler,
    baseUrl?: string
  ): Promise<void> {
    config.url = url;
    if (!config.baseURL) config.baseURL = baseUrl || Url;
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.request(config);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        onError
          ? onError(error)
          : Handlers.defaultErrorAPIHandler(
              error.response.data.error != null
                ? error.response.data.error
                : error.response.data,
              error.response.status
            );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        Handlers.defaultErrorHandler(
          "Произошла ошибка при отправлении запроса, либо сервер не ответил вовремя"
        );
        Handlers.defaultErrorHandler(error.message);
        Handlers.defaultErrorAPIHandler(
          error.request.data.error != null
            ? error.request.data.error
            : error.request.data,
          error.request.status
        );
      } else {
        Handlers.defaultErrorHandler(error.message);
        // Something happened in setting up the request that triggered an Error
      }
    }
  }
}
