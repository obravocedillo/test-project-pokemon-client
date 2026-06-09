import { config } from "@vue/test-utils";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./server";

import PrimeVue from "primevue/config";
import Button from "primevue/button";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

config.global.plugins = [PrimeVue];
config.global.components = { Button };
