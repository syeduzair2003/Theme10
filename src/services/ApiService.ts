import { BASE_URL } from '@constants/config';
import { ResponseObject } from './dataTypes';

type RequestData = Record<string, any> | null;
type AbortControllerType = AbortController;

class ApiService {
    private baseURL: string;
    constructor(baseURL: string) {
        this.baseURL = baseURL + '/api';
      }
    private async request<T>(route: string, options: RequestInit = {},
        controller: AbortControllerType = new AbortController()
    ): Promise<ResponseObject<T>> {

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const config: RequestInit = {
            ...options,
            headers,
            signal: controller.signal,
            cache: 'no-store',
            next: { revalidate: 0 }
        };

        try {
            const response = await fetch(this.baseURL + route, config);

            
            if (!response.ok) {
                // console.log(`Server responded with status ${response.status}
                //     API: ${route}
                //     data: ${config?.body}`);
                return this.handleError<any>(`Server responded with status ${response.status} in api of ${route}`);
            }

            return await response.json();
        } catch (err) {
            console.log(`Server responded with error ${err}`);
            return this.handleError<any>(err);
        }
    }

    async get<T>(route: string, data: Record<string, any> = {}): Promise<ResponseObject<T>> {
        const query = new URLSearchParams(data).toString();
        return this.request<T>(`${route}?${query}`, { method: 'GET' });
    }

    async post<T>(route: string, data: any, params: Record<string, any> = {}): Promise<ResponseObject<T>> {
        const query = new URLSearchParams(params).toString();
        const url = query ? `${route}?${query}` : route;
        // console.log('yrl',JSON.stringify(url), ` ${JSON.stringify(data)}`);
        return this.request<T>(url, { method: 'POST', body: JSON.stringify(data) });
    }

    async patch<T>(route: string, data: any, params: Record<string, any> = {}): Promise<ResponseObject<T>> {
        const query = new URLSearchParams(params).toString();
        const url = query ? `${route}?${query}` : route;
        return this.request<T>(url, { method: 'PATCH', body: JSON.stringify(data) });
    }

    async delete<T>(route: string, data: any, params: Record<string, any> = {}): Promise<ResponseObject<T>> {
        const query = new URLSearchParams(params).toString();
        const url = query ? `${route}?${query}` : route;
        return this.request<T>(url, { method: 'DELETE', body: JSON.stringify(data) });
    }

    private handleError<T>(err: any): ResponseObject<T | null> {
        console.log('handleError: ',err);

        return {
            status: false,
            message: JSON.stringify(err) || 'An error occurred',
            data: null,
        };
    }
}

const apiService = new ApiService(BASE_URL);
export default apiService;
