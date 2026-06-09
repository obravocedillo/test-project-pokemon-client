import type { IPokemon, IPokemonDetails } from "../../types/pokemon";
import type { IPokemonPaginatedResponse } from "../../types/pokemon/api";
import { BaseAPI, type IAPIResponse } from "../api/base";

export class PokemonAPI extends BaseAPI {
    constructor() {
        super("https://pokeapi.co/api/v2");
    }

    async getPokemons(
        limit = 20,
        offset = 0,
    ): Promise<IAPIResponse<IPokemonPaginatedResponse<IPokemon>>> {
        const pokemonsResult = this.get<IPokemonPaginatedResponse<IPokemon>>("/pokemon", {
            params: { limit, offset },
        });

        return pokemonsResult;
    }

    async getPokemon(pokemonId: number): Promise<IAPIResponse<IPokemonDetails>> {
        const pokemonResult = this.get<IPokemonDetails>(`/pokemon/${pokemonId}`);

        return pokemonResult;
    }
}

export const pokemonAPI = new PokemonAPI();
