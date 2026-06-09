<script setup lang="ts">
import { useRoute } from "vue-router";
import "./PokemonPage.css";
import { computed, onMounted } from "vue";
import { usePokemonStore } from "../../store/pokemon";
import { storeToRefs } from "pinia";

const pokemonStore = usePokemonStore();
const route = useRoute();
const id = Number(route.params.id);

const { selectedPokemon } = storeToRefs(pokemonStore);

onMounted(() => {
    pokemonStore.fetchPokemon(id);
});

const pokemonTypes = computed(() => {
    if (!selectedPokemon.value) {
        return [];
    }

    return selectedPokemon.value.types.map(({ type }) => {
        return { ...type, name: type.name.toLocaleUpperCase() };
    });
});

const pokemonSpriteURL = computed(() => {
    return selectedPokemon.value
        ? selectedPokemon.value.sprites.front_default || selectedPokemon.value.sprites.front_shiny
        : "";
});

const pokemonStats = computed(() => {
    if (!selectedPokemon.value) {
        return [];
    }

    return selectedPokemon.value.stats.slice(0, 2).map(({ stat, base_stat }) => {
        return {
            name: stat.name,
            value: base_stat,
            percentage: Math.round((base_stat / 150) * 100),
        };
    });
});

const pokemonMoves = computed(() => {
    if (!selectedPokemon.value) {
        return [];
    }

    return selectedPokemon.value.moves.slice(0, 3).map(({ move: { name } }) => {
        return {
            name: name.toLocaleUpperCase(),
        };
    });
});

const pokemonHeight = computed(() =>
    selectedPokemon.value ? `${selectedPokemon.value.height / 10}` : "",
);
</script>

<template>
    <div v-if="pokemonStore.isLoading('fetchPokemon')">
        <Skeleton class="mb-2"></Skeleton>
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton width="5rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
    </div>

    <div v-else class="bg-background text-on-background font-body-md min-h-screen">
        <!-- Main Content Area -->
        <div class="p-container-margin-desktop max-w-360">
            <!-- Bento Grid Layout -->
            <div class="grid grid-cols-12 gap-gutter">
                <!-- Section 1: Scanning Frame (Bento 6x6) -->
                <div
                    class="col-span-12 lg:col-span-7 glass-panel rounded-xl overflow-hidden relative scanner-frame min-h-125 flex flex-col"
                >
                    <div class="scanline-overlay absolute inset-0 z-0"></div>
                    <div class="absolute top-6 left-6 z-20">
                        <span
                            data-testid="pokemon-page-id"
                            class="font-label-md text-label-md text-tertiary bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/30"
                            >#{{ selectedPokemon?.id }}</span
                        >
                    </div>
                    <div class="absolute top-6 right-6 z-20 flex gap-2">
                        <span
                            v-for="type in pokemonTypes"
                            :key="type.name"
                            class="px-3 py-1 glass-panel border-primary/40 text-primary font-label-sm text-label-sm rounded-full shadow-[0_0_10px_rgba(255,180,168,0.2)]"
                            >{{ type.name }}</span
                        >
                    </div>
                    <div class="grow flex items-center justify-center p-12 relative">
                        <div
                            class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,219,231,0.1),transparent_70%)]"
                        ></div>
                        <img
                            :alt="`${selectedPokemon?.name} sprite`"
                            class="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-700 z-10"
                            :src="pokemonSpriteURL"
                        />
                    </div>
                </div>
                <!-- Right Column Groups -->
                <div class="col-span-12 lg:col-span-5 flex flex-col gap-gutter">
                    <!-- Section 2: Core Metrics -->
                    <div class="glass-panel p-stack-lg rounded-xl">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="material-symbols-outlined text-primary" data-weight="fill"
                                >analytics</span
                            >
                            <h3
                                class="font-label-md text-label-md tracking-widest text-on-surface-variant uppercase"
                            >
                                Core Metrics
                            </h3>
                        </div>
                        <div class="space-y-6">
                            <div v-for="stat in pokemonStats" :key="stat.name">
                                <div class="flex justify-between mb-2">
                                    <span class="font-label-md text-label-md">{{ stat.name }}</span>
                                    <span class="font-label-md text-label-md text-tertiary"
                                        >{{ stat.percentage }}%</span
                                    >
                                </div>
                                <div class="segmented-progress">
                                    <div
                                        v-for="segment in 10"
                                        :key="segment"
                                        :class="[
                                            'progress-segment',
                                            { active: segment <= Math.round(stat.percentage / 10) },
                                        ]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Section 3: Move Set -->
                    <div class="glass-panel p-stack-lg rounded-xl grow">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="material-symbols-outlined text-primary" data-weight="fill"
                                >swords</span
                            >
                            <h3
                                class="font-label-md text-label-md tracking-widest text-on-surface-variant uppercase"
                            >
                                Primary Move Set
                            </h3>
                        </div>
                        <div class="space-y-4">
                            <div
                                v-for="move in pokemonMoves"
                                :key="move.name"
                                class="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-colors cursor-pointer group"
                            >
                                <div class="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 class="font-label-md text-label-md text-primary">
                                            {{ move.name }}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Section 4: Biology -->
                    <div class="glass-panel p-stack-lg rounded-xl">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="material-symbols-outlined text-primary" data-weight="fill"
                                >fingerprint</span
                            >
                            <h3
                                class="font-label-md text-label-md tracking-widest text-on-surface-variant uppercase"
                            >
                                Biological Profile
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div
                                class="p-4 bg-surface-container-high rounded-lg flex flex-col items-center"
                            >
                                <span
                                    class="font-label-sm text-label-sm text-on-surface-variant opacity-60 mb-1"
                                    >HEIGHT</span
                                >
                                <span
                                    data-testid="pokemon-page-height"
                                    class="font-headline-md text-headline-md text-tertiary"
                                    >{{ pokemonHeight }} m</span
                                >
                            </div>
                            <div
                                class="p-4 bg-surface-container-high rounded-lg flex flex-col items-center"
                            >
                                <span
                                    class="font-label-sm text-label-sm text-on-surface-variant opacity-60 mb-1"
                                    >WEIGHT</span
                                >
                                <span
                                    data-testid="pokemon-page-weight"
                                    class="font-headline-md text-headline-md text-tertiary"
                                    >{{ selectedPokemon?.weight }} kg</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
