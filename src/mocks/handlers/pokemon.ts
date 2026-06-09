import { http, HttpResponse } from "msw";

export const pokemonHandlers = [
    http.get("https://pokeapi.co/api/v2/pokemon", () => {
        return HttpResponse.json({
            count: 5,
            next: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5",
            previous: "",
            results: [
                { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
                { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
                { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
                { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
                { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
            ],
        });
    }),

    http.get("https://pokeapi.co/api/v2/pokemon/1", () => {
        return HttpResponse.json({
            id: 1,
            name: "bulbasaur",
            height: 7,
            weight: 69,
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            sprites: {
                front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                back_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
                front_shiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
                back_shiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
            },
            types: [
                { slot: 1, type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
                { slot: 2, type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" } },
            ],
            stats: [
                {
                    base_stat: 45,
                    effort: 0,
                    stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
                },
                {
                    base_stat: 49,
                    effort: 0,
                    stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
                },
            ],
            moves: [
                { move: { name: "razor-wind", url: "https://pokeapi.co/api/v2/move/13/" } },
                { move: { name: "tackle", url: "https://pokeapi.co/api/v2/move/33/" } },
                { move: { name: "vine-whip", url: "https://pokeapi.co/api/v2/move/22/" } },
            ],
        });
    }),
];
