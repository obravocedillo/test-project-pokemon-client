import { defineStore } from "pinia";
import type { IPokemon, IPokemonDetails } from "../../types/pokemon";
import { ref } from "vue";
import { useAPIState } from "../../composables/useAPIState";
import { pokemonAPI } from "../../services/pokemon/api";
import type { IAPIError } from "../../services/api/base";
import { POKEMON_LIMIT } from "../../constants/pokemon";
import { generateRandomNumber } from "../../utility/number";

export const usePokemonStore = defineStore("pokemon", () => {
    const { setLoading, setError, isLoading, getError } = useAPIState();

    const pokemons = ref<IPokemon[]>([]);
    const currentPage = ref<number>(0);
    const selectedPokemon = ref<IPokemonDetails | null>(null);

    const fetchPokemons = async () => {
        setLoading("fetchPokemons", true);
        try {
            const pokemonsResponse = await pokemonAPI.getPokemons(
                POKEMON_LIMIT,
                currentPage.value * POKEMON_LIMIT,
            );
            if (pokemonsResponse.success) {
                pokemons.value = [
                    ...pokemons.value,
                    ...pokemonsResponse.data.results.map((p) => ({
                        ...p,
                        powerLevel: generateRandomNumber(0, 100),
                    })),
                ];
                currentPage.value++;
            }
        } catch (err) {
            const apiError = err as IAPIError;
            setError("fetchPokemons", apiError.error);
        } finally {
            setLoading("fetchPokemons", false);
        }
    };

    const fetchPokemon = async (pokemonId: number) => {
        setLoading("fetchPokemon", true);
        try {
            const pokemonResponse = await pokemonAPI.getPokemon(pokemonId);
            if (pokemonResponse.success) {
                selectedPokemon.value = pokemonResponse.data;
            }
        } catch (err) {
            const apiError = err as IAPIError;
            setError("fetchPokemon", apiError.error);
        } finally {
            setLoading("fetchPokemon", false);
        }
    };

    return {
        pokemons,
        selectedPokemon,
        currentPage,
        isLoading,
        getError,
        fetchPokemons,
        fetchPokemon,
    };
});
