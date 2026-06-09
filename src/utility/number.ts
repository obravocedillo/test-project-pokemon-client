export const generateRandomNumber = (lowerLimit = 0, upperLimit = 100) => {
    const minCeiled = Math.ceil(lowerLimit);
    const maxFloored = Math.floor(upperLimit);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};
