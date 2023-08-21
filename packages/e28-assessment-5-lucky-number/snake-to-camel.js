function snakeToCamel(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '_') {
            result = result + str[i + 1].toUpperCase();
            i++;
        } else {
            result = result + str[i];
        }
    }
    return result;
}

