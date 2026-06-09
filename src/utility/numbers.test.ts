import { describe, expect, it } from "vitest";
import { generateRandomNumber } from "./number";

describe("Numbers utilities work as expected", () => {
    it("Should return a random number within the given range", () => {
        for (let i = 0; i < 100; i++) {
            const result = generateRandomNumber(0, 100);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(100);
        }
    });
});
