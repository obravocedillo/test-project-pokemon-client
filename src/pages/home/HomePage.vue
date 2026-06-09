<script setup lang="ts">
import "./HomePage.css";
import { onMounted } from "vue";
import { usePokemonStore } from "../../store/pokemon";
import PokemonList from "../../components/list/PokemonList.vue";
import { storeToRefs } from "pinia";
import PokemonParticles from "../../components/background/PokemonParticles.vue";
import { useRouter } from "vue-router";

const pokemonStore = usePokemonStore();
const router = useRouter();

const { pokemons } = storeToRefs(pokemonStore);

const handlePokemonClick = (id: number) => {
    router.push(`/pokemon/${id}`);
};

onMounted(() => {
    pokemonStore.fetchPokemons();
});
</script>

<template>
    <main
        class="pt-8 pb-8 md:pb-8 px-container-margin-mobile md:px-container-margin-desktop min-h-screen w-full"
    >
        <PokemonParticles />
        <div class="mb-4">
            <h1
                class="font-bold text-5xl text-on-surface mb-4 text-left"
                data-testid="homepage-title"
            >
                KINETIC INDEX
            </h1>
            <div class="flex items-center gap-4">
                <div class="h-px flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
                <p
                    class="font-normal text-md text-on-surface-variant uppercase tracking-widest"
                    data-testid="homepage-sub-title"
                >
                    Global Species Records
                </p>
            </div>
        </div>
        <PokemonList :pokemons="pokemons" @pokemon-click="handlePokemonClick" />
        <div class="w-full flex justify-center mt-12">
            <Button
                class="font-normal text-sm text-on-surface-variant"
                style="display: flex; gap: 1rem; cursor: pointer"
                :loading="pokemonStore.isLoading('fetchPokemons')"
                :disabled="pokemonStore.isLoading('fetchPokemons')"
                icon="pi pi-refresh"
                label="Load More..."
                variant="text"
                type="button"
                @click="pokemonStore.fetchPokemons()"
            />
        </div>
    </main>
</template>
