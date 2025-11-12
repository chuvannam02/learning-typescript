/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:21 AM
 * @File: 2.template-literal-dynamic-routes-solution.ts
 */
import type {Equal, Expect} from "@/type-utils";

// Problem

// @ts-ignore
type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";

type DynamicRoutes = unknown;

// @ts-ignore
type tests = [Expect<Equal<DynamicRoutes, "/users/:id" | "/posts/:id">>];
