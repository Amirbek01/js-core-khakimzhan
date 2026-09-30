export class Store {
    #items = [];

    constructor(items = []) {
        if (!Array.isArray(items)) {
            throw new TypeError("Items must be an array");
        }

        items.forEach(item => this.add(item));
    }

    static isValidItem(item) {
        return (
            item !== null &&
            typeof item === "object" &&
            typeof item.name === "string" &&
            item.name.trim() !== "" &&
            typeof item.price === "number" &&
            Number.isFinite(item.price) &&
            item.price >= 0 &&
            Number.isInteger(item.qty) &&
            item.qty >= 0
        );
    }

    get count() {
        return this.#items.length;
    }

    add(item) {
        if (!Store.isValidItem(item)) {
            throw new TypeError("Invalid item");
        }

        this.#items.push({ ...item });
        return this;
    }

    remove(name) {
        const index = this.#items.findIndex(item => item.name === name);

        if (index === -1) {
            return null;
        }

        const removed = this.#items.splice(index, 1);
        return removed[0];
    }

    find(name) {
        return this.#items.find(item => item.name === name) ?? null;
    }

    total() {
    return this.#items.reduce((sum, { price, qty }) => {
        return sum + price * qty;
    }, 0);
}

    all() {
        return this.#items.map(item => ({ ...item }));
    }
}

export class SortedStore extends Store {
    all() {
        return super.all().sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }
}

