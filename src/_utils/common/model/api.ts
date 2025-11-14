/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/14/2025
 * @Time: 1:03 AM
 * @File: api.ts
 */

import type { ApiResponse } from "./types";
import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponseHeaders, type RawAxiosResponseHeaders} from "axios";

export type ApiResponseV1<T> = {
    data: T;
    status: number;
    headers: Record<string, string>;
};

// api.ts
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Request failed');
    return res.json();
}

export class ApiClient {
    private readonly instance: AxiosInstance;

    constructor(baseURL?: string, defaultConfig?: AxiosRequestConfig) {
        this.instance = axios.create({
            baseURL,
            ...defaultConfig,
        });
    }

    // @typescript-eslint/no-explicit-any
    private normalizeHeaders(headers: RawAxiosResponseHeaders | AxiosResponseHeaders): Record<string, string> {
        const result: Record<string, string> = {};
        for (const key in headers) {
            const value = headers[key];
            if (value !== undefined) {
                result[key] = Array.isArray(value) ? value.join(", ") : String(value);
            }
        }
        return result;
    }

    private mergeConfig(urlBaseOverride?: string, config?: AxiosRequestConfig) {
        if (!urlBaseOverride) return config;
        return { ...config, baseURL: urlBaseOverride };
    }

    async get<T>(url: string, params?: Partial<Record<string, unknown>>, config?: AxiosRequestConfig & { baseURL?: string }): Promise<ApiResponseV1<T>> {
        const res = await this.instance.get<T>(url, { params, ...this.mergeConfig(config?.baseURL, config) });
        return { data: res.data, status: res.status, headers: this.normalizeHeaders(res.headers) };
    }

    async post<T, V>(
        url: string,
        payload?: T,
        config?: AxiosRequestConfig & { onUploadProgress?: (progressEvent: ProgressEvent) => void; baseURL?: string }
    ): Promise<ApiResponseV1<V>> {
        const isFormData = payload instanceof FormData;
        const res = await this.instance.post<V>(url, payload, {
            headers: isFormData
                ? { "Content-Type": "multipart/form-data", ...config?.headers }
                : { "Content-Type": "application/json", ...config?.headers },
            ...this.mergeConfig(config?.baseURL, config),
        });
        return { data: res.data, status: res.status, headers: this.normalizeHeaders(res.headers) };
    }

    async put<T, V>(url: string, payload?: T, config?: AxiosRequestConfig & { baseURL?: string }): Promise<ApiResponseV1<V>> {
        const isFormData = payload instanceof FormData;
        const res = await this.instance.put<V>(url, payload, {
            headers: isFormData
                ? { "Content-Type": "multipart/form-data", ...config?.headers }
                : { "Content-Type": "application/json", ...config?.headers },
            ...this.mergeConfig(config?.baseURL, config),
        });
        return { data: res.data, status: res.status, headers: this.normalizeHeaders(res.headers) };
    }

    async patch<T, V>(url: string, payload?: T, config?: AxiosRequestConfig & { baseURL?: string }): Promise<ApiResponseV1<V>> {
        const isFormData = payload instanceof FormData;
        const res = await this.instance.patch<V>(url, payload, {
            headers: isFormData
                ? { "Content-Type": "multipart/form-data", ...config?.headers }
                : { "Content-Type": "application/json", ...config?.headers },
            ...this.mergeConfig(config?.baseURL, config),
        });
        return { data: res.data, status: res.status, headers: this.normalizeHeaders(res.headers) };
    }

    async delete<T>(url: string, config?: AxiosRequestConfig & { baseURL?: string }): Promise<ApiResponseV1<T>> {
        const res = await this.instance.delete<T>(url, this.mergeConfig(config?.baseURL, config));
        return { data: res.data, status: res.status, headers: this.normalizeHeaders(res.headers) };
    }

    async download(url: string, filename: string, config?: AxiosRequestConfig & { baseURL?: string }) {
        const res = await this.instance.get(url, { responseType: "blob", ...this.mergeConfig(config?.baseURL, config) });
        const blob = new Blob([res.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        return { status: res.status, headers: this.normalizeHeaders(res.headers) };
    }

    async upload<T>(
        url: string,
        formData: FormData,
        config?: AxiosRequestConfig & { onUploadProgress?: (progressEvent: ProgressEvent) => void; baseURL?: string }
    ): Promise<ApiResponseV1<T>> {
        const res = await this.instance.post<T>(url, formData, {
            headers: { "Content-Type": "multipart/form-data", ...config?.headers },
            ...this.mergeConfig(config?.baseURL, config),
        });
        return { data: res.data, status: res.status, headers: this.normalizeHeaders(res.headers) };
    }
}

// const api = new ApiClient("https://api.example.com");

// GET với baseURL khác
// await api.get<User[]>("/users", undefined, { baseURL: "https://api.another.com" });

// POST upload file
// const form = new FormData();
// form.append("file", fileInput.files![0]);
// await api.upload("/upload", form, {
// });
