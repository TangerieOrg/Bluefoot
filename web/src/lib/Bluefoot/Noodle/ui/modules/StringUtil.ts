export function prettyCamelCaseName(name : string) {
    return name
        .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) // Uppercase first letter of split words
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // Split camel case
}