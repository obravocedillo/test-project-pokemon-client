export interface IPokemon {
    name: string;
    url: string;
    powerLevel: number;
}

export interface IPokemonSprites {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
}

export interface IPokemonTypesDetails {
    name: string;
    url: string;
}

export interface IPokemonTypes {
    slot: number;
    type: IPokemonTypesDetails;
}

export interface IPokemonStats {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface IPokemonMoves {
    move: {
        name: string;
        url: string;
    };
}

export interface IPokemonDetails {
    id: number;
    name: string;
    url: string;
    sprites: IPokemonSprites;
    height: number;
    types: IPokemonTypes[];
    stats: IPokemonStats[];
    moves: IPokemonMoves[];
    weight: number;
}
