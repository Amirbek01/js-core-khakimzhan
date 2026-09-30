import { describe, expect, it } from "vitest";
import {
    unique,
    groupBy,
    chunk,
    deepClone,
    memoize,
    counter
} from "../src/functions.js";

describe("unique", () => {
    it("removes duplicates", () => {
        expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
    });

    it("works with an empty array", () => {
        expect(unique([])).toEqual([]);
    });

    it("throws an error for a wrong type", () => {
        expect(() => unique("123")).toThrow(TypeError);
    });
});

describe("groupBy", () => {
    it("groups items using a function", () => {
        const users = [
            { name: "Ayan", course: 1 },
            { name: "Dana", course: 2 },
            { name: "Amir", course: 1 }
        ];

        const result = groupBy(users, user => user.course);

        expect(result[1]).toHaveLength(2);
        expect(result[2]).toHaveLength(1);
    });

    it("returns an empty object for an empty array", () => {
        expect(groupBy([], item => item)).toEqual({});
    });

    it("checks that keyFn is a function", () => {
        expect(() => groupBy([1, 2], "key")).toThrow(TypeError);
    });
});

describe("chunk", () => {
    it("splits an array into smaller arrays", () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([
            [1, 2],
            [3, 4],
            [5]
        ]);
    });

    it("returns an empty array when input is empty", () => {
        expect(chunk([], 3)).toEqual([]);
    });

    it("does not allow zero size", () => {
        expect(() => chunk([1, 2], 0)).toThrow(RangeError);
    });
});

describe("deepClone", () => {
    it("creates a separate copy", () => {
        const original = {
            name: "SANA",
            info: {
                city: "Almaty"
            },
            tags: ["AI", "Tech"]
        };

        const copy = deepClone(original);
        copy.info.city = "Astana";
        copy.tags.push("Web");

        expect(original.info.city).toBe("Almaty");
        expect(original.tags).toEqual(["AI", "Tech"]);
    });

    it("copies Date objects", () => {
        const date = new Date("2026-10-24");
        const copy = deepClone(date);

        expect(copy).toEqual(date);
        expect(copy).not.toBe(date);
    });
});

describe("memoize", () => {
    it("saves the result of a function", () => {
        let calls = 0;

        const add = memoize((a, b) => {
            calls += 1;
            return a + b;
        });

        expect(add(2, 3)).toBe(5);
        expect(add(2, 3)).toBe(5);
        expect(calls).toBe(1);
    });
});

describe("counter", () => {
    it("starts from zero by default", () => {
        const count = counter();

        expect(count.value()).toBe(0);
        expect(count.inc()).toBe(1);
        expect(count.dec()).toBe(0);
    });

    it("can start from another number", () => {
        const count = counter(10);

        expect(count.value()).toBe(10);
        expect(count.inc()).toBe(11);
    });
});