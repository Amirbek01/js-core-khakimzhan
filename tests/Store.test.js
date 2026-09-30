import { describe, expect, it } from "vitest";
import { Store, SortedStore } from "../src/Store.js";

describe("Store", () => {
    it("creates an empty store", () => {
        const store = new Store();

        expect(store.count).toBe(0);
        expect(store.total()).toBe(0);
        expect(store.all()).toEqual([]);
    });

    it("adds and finds an item", () => {
        const store = new Store();

        store.add({
            name: "Laptop",
            price: 350000,
            qty: 2
        });

        expect(store.count).toBe(1);
        expect(store.find("Laptop")).toEqual({
            name: "Laptop",
            price: 350000,
            qty: 2
        });
    });

    it("calculates the total price", () => {
        const store = new Store([
            { name: "Mouse", price: 5000, qty: 2 },
            { name: "Keyboard", price: 12000, qty: 1 }
        ]);

        expect(store.total()).toBe(22000);
    });

    it("allows zero price and quantity", () => {
        const store = new Store();

        store.add({ name: "Free item", price: 0, qty: 5 });
        store.add({ name: "Out of stock", price: 1000, qty: 0 });

        expect(store.total()).toBe(0);
    });

    it("removes an item", () => {
        const store = new Store([
            { name: "Phone", price: 200000, qty: 1 }
        ]);

        const removed = store.remove("Phone");

        expect(removed.name).toBe("Phone");
        expect(store.count).toBe(0);
    });

    it("returns null when an item is not found", () => {
        const store = new Store();

        expect(store.find("Nothing")).toBeNull();
        expect(store.remove("Nothing")).toBeNull();
    });

    it("does not accept an invalid item", () => {
        const store = new Store();

        expect(() => {
            store.add({
                name: "Phone",
                price: "expensive",
                qty: 1
            });
        }).toThrow(TypeError);
    });

    it("checks the constructor argument", () => {
        expect(() => new Store("wrong value")).toThrow(TypeError);
    });

    it("has a static validation method", () => {
        const correctItem = {
            name: "Monitor",
            price: 80000,
            qty: 2
        };

        expect(Store.isValidItem(correctItem)).toBe(true);
        expect(Store.isValidItem({ name: "", price: 10, qty: 1 })).toBe(false);
    });
});

describe("SortedStore", () => {
    it("returns items sorted by name", () => {
        const store = new SortedStore([
            { name: "Mouse", price: 5000, qty: 1 },
            { name: "Adapter", price: 3000, qty: 1 },
            { name: "Keyboard", price: 12000, qty: 1 }
        ]);

        const names = store.all().map(item => item.name);

        expect(names).toEqual(["Adapter", "Keyboard", "Mouse"]);
    });

    it("uses methods inherited from Store", () => {
        const store = new SortedStore([
            { name: "A", price: 100, qty: 2 },
            { name: "B", price: 50, qty: 1 }
        ]);

        expect(store.total()).toBe(250);
        expect(store.count).toBe(2);
    });
});