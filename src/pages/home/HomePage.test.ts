import { flushPromises, mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, it, expect } from "vitest";
import { createRouter, createMemoryHistory, RouterView } from "vue-router";
import HomePage from "./HomePage.vue";
import { defineComponent } from "vue";

describe("HomePage integration", () => {
    it("should show pokemon list after fetch", async () => {
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [
                { path: "/", component: HomePage },
                { path: "/pokemon/:id", component: {} },
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
        const homepageTitle = wrapper.find("[data-testid='homepage-title']");
        const homepageSubTitle = wrapper.find("[data-testid='homepage-sub-title']");

        expect(homepageTitle.text()).toBe("KINETIC INDEX");

        expect(homepageSubTitle.text()).toBe("Global Species Records");

        expect(cards).toHaveLength(5);
        expect(cards[0].text()).toContain("Bulbasaur");
    });
});
