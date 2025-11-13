// Solution

import type { Equal, Expect } from "@/type-utils";
import { expect, it } from "vitest";

export type Person = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: any[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
};

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  return data as T;
}

const data = await fetchData<{ name: string }>(
  "https://swapi.dev/api/people/1"
);

console.log('data: ', data);
expect(data.name).toEqual("Luke Skywalker");

type tests = [Expect<Equal<typeof data, { name: string }>>];

const data1 = await fetchData<{ name: string; age: number }>(
  "https://swapi.dev/api/people/1"
);
expect(data1.name).toEqual("Luke Skywalker");

type tests1 = [Expect<Equal<typeof data1, { name: string; age: number }>>];