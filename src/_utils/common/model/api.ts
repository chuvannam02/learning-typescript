/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/14/2025
 * @Time: 1:03 AM
 * @File: api.ts
 */

import type { ApiResponse } from "./types";

// api.ts
export async function fetchApi<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Request failed');
    return res.json();
}

