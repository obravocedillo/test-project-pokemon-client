import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, it, expect } from "vitest";
import { createRouter, createMemoryHistory, RouterView } from "vue-router";
import HomePage from "../home/HomePage.vue";
import { defineComponent } from "vue";
import PokemonPage from "./PokemonPage.vue";

describe("PokemonPage integration", () => {
    it("should show pokemon list after fetch", async () => {
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [
                { path: "/", component: HomePage },
                { path: "/pokemon/:id", component: PokemonPage },
            ],
        });

        await router.push("/");

        const App = defineComponent({
            components: { RouterView },
            template: "<RouterView />",
        });

        const wrapper = mount(App, {
            global: {
                plugins: [router, createPinia()],
            },
        });

        await router.isReady();
        await flushPromises();

        const cards = wrapper.findAll("[data-testid='pokemon-card']");

        await cards[0].trigger("click");

        await flushPromises();

        const pokemonId = wrapper.find("[data-testid='pokemon-page-id']");
        const pokemonHeight = wrapper.find("[data-testid='pokemon-page-height']");
        const pokemonWeight = wrapper.find("[data-testid='pokemon-page-weight']");

        expect(pokemonId.text()).toBe("#1");
        expect(pokemonHeight.text()).toBe("0.7 m");
        expect(pokemonWeight.text()).toBe("69 kg");
    });
});
