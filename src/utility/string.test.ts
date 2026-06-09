import { describe, expect, it } from "vitest";
import { capitalizeString } from "./string";

describe("String utilities work as expected", () => {
    it("Should capitalize string", () => {
        const firstString = "test1";
        const secondString = "tesT2";
        const thirdString = "teSST3";

        const firstCapitalizedString = capitalizeString(firstString);
        const secondCapitalizedString = capitalizeString(secondString);
        const thirdCapitalizedString = capitalizeString(thirdString);

        expect(firstCapitalizedString).toBe("Test1");
        expect(secondCapitalizedString).toBe("TesT2");
        expect(thirdCapitalizedString).toBe("TeSST3");

        expect(capitalizeString("")).toBe("");
    });
});
