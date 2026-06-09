import { describe, expect, it } from "vitest";
import { extractPokemonId } from "./pokemon";

describe("Pokemon utilities work as expected", () => {
    it("Should return pokemon id", () => {
        const firstPokemonURL = "https://pokeapi.co/api/v2/pokemon/10/";
        const secondPokemonURL = "https://pokeapi.co/api/v2/pokemon/25/";
        const thirdPokemonURL = "https://pokeapi.co/api/v2/pokemon/50/";

        const firstPokemonId = extractPokemonId(firstPokemonURL);
        const secondPokemonId = extractPokemonId(secondPokemonURL);
        const thirdPokemonId = extractPokemonId(thirdPokemonURL);

        expect(firstPokemonId).toBe(10);
        expect(secondPokemonId).toBe(25);
        expect(thirdPokemonId).toBe(50);
    });
});
