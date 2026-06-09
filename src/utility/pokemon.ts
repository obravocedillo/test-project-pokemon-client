export function extractPokemonId(url: string): number {
    const parts = url.split("/").filter(Boolean);
    return Number(parts[parts.length - 1]);
}
