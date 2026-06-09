import { create, type AxiosInstance, AxiosHeaders, type AxiosRequestConfig } from "axios";

export interface IAPISuccess<T> {
    success: true;
    data: T;
}

export interface IAPIError {
    success: false;
    status: number;
    error: string;
}

export type IAPIResponse<T> = IAPISuccess<T> | IAPIError;

export class BaseAPI {
    protected axiosInstance: AxiosInstance;
    protected axiosHeaders?: AxiosHeaders;

    constructor(url: string, timeout = 10000, axiosHeaders?: AxiosHeaders) {
        this.axiosHeaders = axiosHeaders;

        this.axiosInstance = create({
            baseURL: url,
            timeout,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...this.axiosHeaders,
            },
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const apiError: IAPIError = {
                    success: false,
                    status: error.response?.status ?? 0,
                    error: error.response?.data?.message ?? error.message ?? "Unknown error",
                };

                return Promise.reject(apiError);
            },
        );
    }

    protected async get<T>(
        path: string,
        config?: AxiosRequestConfig<any>,
    ): Promise<IAPIResponse<T>> {
        const response = await this.axiosInstance.get<T>(path, config);
        return { success: true, data: response.data };
    }

    protected async post<T, U>(
        path: string,
        data: U,
        config?: AxiosRequestConfig<U>,
    ): Promise<IAPIResponse<T>> {
        const response = await this.axiosInstance.post<T>(path, data, config);
        return { success: true, data: response.data };
    }

    protected async put<T, U>(
        path: string,
        data: U,
        config?: AxiosRequestConfig<U>,
    ): Promise<IAPIResponse<T>> {
        const response = await this.axiosInstance.put<T>(path, data, config);
        return { success: true, data: response.data };
    }

    protected async delete<T>(
        path: string,
        config?: AxiosRequestConfig<any>,
    ): Promise<IAPIResponse<T>> {
        const response = await this.axiosInstance.delete<T>(path, config);
        return { success: true, data: response.data };
    }
}
