({
    baseUrl: '.',
    shim: {
        "lib/builder/jquery-ui": {
            "deps": ['lib/jquery']
        }
    },
    out: "visbio.js",
    name: "almond",
    include: ["main"],
    optimize: "none",
    wrap: {
        startFile: 'almond-start.frag',
        endFile: 'almond-end.frag'
    }
})
