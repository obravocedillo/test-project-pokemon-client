export const capitalizeString = (stringParam: string) => {
    if (!stringParam) {
        return "";
    }

    const capitalStartLetter = stringParam[0].toLocaleUpperCase();

    return capitalStartLetter + stringParam.slice(1);
};
