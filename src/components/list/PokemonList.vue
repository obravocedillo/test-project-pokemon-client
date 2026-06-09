<script setup lang="ts">
import type { IPokemon } from "../../types/pokemon";
import PokemonCard from "../card/PokemonCard.vue";
import { capitalizeString } from "../../utility/string";
import { extractPokemonId } from "../../utility/pokemon";

interface IPokemonListProps {
    pokemons: IPokemon[];
}

const { pokemons } = defineProps<IPokemonListProps>();

const emit = defineEmits<{
    "pokemon-click": [id: number];
}>();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-180 md:h-135 overflow-scroll">
        <div v-for="pokemon in pokemons" :key="pokemon.name">
            <PokemonCard
                :number="extractPokemonId(pokemon.url)"
                :name="capitalizeString(pokemon.name)"
                :power-level="pokemon.powerLevel"
                @pokemon-click="(id) => emit('pokemon-click', id)"
            />
        </div>
    </div>
</template>
