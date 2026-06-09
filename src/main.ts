import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import "./style.css";

import Particles from "@tsparticles/vue3";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";
import Button from "primevue/button";

import { router } from "./router";

async function registerParticles(engine: Engine): Promise<void> {
    const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

    await loadSlim(engine);
}

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue);
app.use(Particles, {
    init: registerParticles,
});
app.use(pinia);
app.use(router);

app.component("Button", Button);

app.mount("#app");
