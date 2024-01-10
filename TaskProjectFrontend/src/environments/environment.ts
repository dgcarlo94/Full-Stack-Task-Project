export const environment = {
    production: false,
    //@ts-ignore
    apiUrl: window["env"]["apiUrl"] || "default",
};