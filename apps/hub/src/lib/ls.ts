
type LSKey = "rivet-lastteam";

export const ls = {
    set: (key: LSKey, value: any) => {
        localStorage.setItem(key
        , JSON.stringify(value));
    },
    get: (key: LSKey) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
}