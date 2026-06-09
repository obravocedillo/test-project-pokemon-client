import { ref } from "vue";

export const useAPIState = () => {
    const loading = ref<Record<string, boolean>>({});
    const errors = ref<Record<string, string | null>>({});

    const setLoading = (action: string, value: boolean) => {
        loading.value[action] = value;
    };

    const setError = (action: string, value: string | null) => {
        errors.value[action] = value;
    };

    const isLoading = (action: string) => loading.value[action] ?? false;
    const getError = (action: string) => errors.value[action] ?? null;

    return { setLoading, setError, isLoading, getError };
};
