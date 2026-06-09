<template>
    <vue-particles
        id="particles"
        :options="{
            particles: {
                number: { value: 30 },
                color: { value: '#ffb4a8' },
                size: { value: { min: 1, max: 2 } },
                move: {
                    enable: true,
                    speed: 0.5,
                },
                opacity: { value: 0.3 },
            },
            background: {
                color: { value: 'transparent' },
            },
        }"
        style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        "
    />
</template>
