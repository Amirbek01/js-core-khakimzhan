export function unique(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Expected an array");
    }

    return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Expected an array");
    }

    if (typeof keyFn !== "function") {
        throw new TypeError("keyFn must be a function");
    }

    return arr.reduce((groups, item) => {
        const key = keyFn(item);

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(item);
        return groups;
    }, {});
}

export function chunk(arr, size) {
    if (!Array.isArray(arr)) {
        throw new TypeError("Expected an array");
    }

    if (!Number.isInteger(size) || size <= 0) {
        throw new RangeError("Size must be greater than zero");
    }

    const parts = [];

    for (let i = 0; i < arr.length; i += size) {
        parts.push(arr.slice(i, i + size));
    }

    return parts;
}

export function deepClone(value) {
    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    if (Array.isArray(value)) {
        return value.map(item => deepClone(item));
    }

    if (value !== null && typeof value === "object") {
        const copy = {};

        for (const key in value) {
            copy[key] = deepClone(value[key]);
        }

        return copy;
    }

    return value;
}

export function memoize(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("Expected a function");
    }

    const saved = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (saved.has(key)) {
            return saved.get(key);
        }

        const result = fn(...args);
        saved.set(key, result);

        return result;
    };
}

export function counter(start = 0) {
    if (typeof start !== "number" || Number.isNaN(start)) {
        throw new TypeError("Start must be a number");
    }

    let current = start;

    return {
        inc() {
            current += 1;
            return current;
        },

        dec() {
            current -= 1;
            return current;
        },

        value() {
            return current;
        }
    };
}