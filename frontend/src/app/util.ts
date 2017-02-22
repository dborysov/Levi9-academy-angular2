const typeCache: { [label: string]: boolean } = {};

export function type<T extends string>(label: T): T {
    if (typeCache[label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[label] = true;

    return label;
};
