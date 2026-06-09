<script setup lang="ts">
interface IPokemonCardProps {
    number: number;
    name: string;
    powerLevel: number;
}

const emit = defineEmits<{
    pokemonClick: [id: number];
}>();

const { number, name, powerLevel } = defineProps<IPokemonCardProps>();
</script>

<template>
    <div
        data-testid="pokemon-card"
        class="group relative glass-card p-4 rounded-lg flex items-center gap-6 hover:border-primary/40 hover:bg-white/5 transition-all duration-300 cursor-pointer"
        @click="emit('pokemonClick', number)"
    >
        <div
            class="flex-none font-label-md text-label-md text-primary/60 group-hover:text-primary transition-colors border-r border-outline-variant/20 pr-4"
        >
            #{{ number }}
        </div>
        <div class="flex-1 min-w-0">
            <h3
                class="font-headline-md text-headline-md text-white tracking-tight group-hover:text-primary transition-colors"
            >
                {{ name }}
            </h3>
        </div>
        <div class="flex flex-col items-end gap-2 w-32 shrink-0">
            <span class="font-label-sm text-[10px] text-on-surface-variant/60 uppercase"
                >POWER LVL</span
            >
            <div class="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
                <div
                    class="h-full bg-tertiary segmented-progress"
                    :style="{ width: `${powerLevel}%`, color: 'rgba(0, 219, 231, 0.2)' }"
                ></div>
            </div>
        </div>
    </div>
</template>
