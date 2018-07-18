export default {
    name: "OJO SpaceBounce",

    width: 900,

    height: 540,

    spawnDistance: 350,

    bg: {
        type: "hockey",
        width: 550,
        height: 240,
        kickOffRadius: 80,
        cornerRadius: 0
    },

    vertexes: [
        /* 0 */ {
            x: -550,
            y: 240,
            trait: "ballArea",
            vis: true,
            color: "2a0a0b"
        },
        /* 1 */ {
            x: -550,
            y: 80,
            trait: "ballArea",
            vis: true,
            color: "2a0a0b"
        },
        /* 2 */ {
            x: -550,
            y: -80,
            trait: "ballArea",
            vis: true,
            color: "2a0a0b"
        },
        /* 3 */ {
            x: -550,
            y: -240,
            trait: "ballArea",
            vis: true,
            color: "2a0a0b"
        },
        /* 4 */ {
            x: 550,
            y: 240,
            trait: "ballArea",
            color: "2a0a0b",
            vis: true
        },
        /* 5 */ {
            x: 550,
            y: 80,
            trait: "ballArea",
            color: "2a0a0b",
            vis: true,
            curve: 0
        },
        /* 6 */ {
            x: 550,
            y: -80,
            trait: "ballArea",
            color: "2a0a0b",
            vis: true,
            curve: 0
        },
        /* 7 */ {
            x: 550,
            y: -240,
            trait: "ballArea",
            color: "2a0a0b",
            vis: true
        },

        /* 8 */ { x: 0, y: 270, trait: "kickOffBarrier" },
        /* 9 */ { x: 0, y: 80, trait: "kickOffBarrier", vis: true, curve: 180 },
        /* 10 */ {
            x: 0,
            y: -80,
            trait: "kickOffBarrier",
            vis: true,
            color: "35c12b",
            curve: 180
        },
        /* 11 */ { x: 0, y: -270, trait: "kickOffBarrier", color: "35c12b" },

        /* 12 */ { x: -560, y: -80, trait: "goalNet" },
        /* 13 */ { x: -580, y: -60, trait: "goalNet" },
        /* 14 */ { x: -580, y: 60, trait: "goalNet" },
        /* 15 */ { x: -560, y: 80, trait: "goalNet" },
        /* 16 */ { x: 560, y: -80, trait: "goalNet" },
        /* 17 */ { x: 580, y: -60, trait: "goalNet" },
        /* 18 */ { x: 580, y: 60, trait: "goalNet" },
        /* 19 */ { x: 560, y: 80, trait: "goalNet" },

        /* 20 */ { x: -79, y: -7, cMask: [] },
        /* 21 */ { x: -2, y: -55, cMask: [] },
        /* 22 */ { x: 79, y: -9, cMask: [] },
        /* 23 */ { x: 0, y: 51, cMask: [] },
        /* 24 */ { x: -53, y: 24, cMask: [] },
        /* 25 */ { x: 76, y: -4, cMask: [] },
        /* 26 */ { x: -68, y: 0, cMask: [] },
        /* 27 */ { x: -64, y: 6, cMask: [] },
        /* 28 */ { x: -61, y: 13, cMask: [] },
        /* 29 */ { x: 74, y: 3, cMask: [] },
        /* 30 */ { x: -47, y: 32, cMask: [] },
        /* 31 */ { x: 68, y: 14, cMask: [] },
        /* 32 */ { x: -30, y: 42, cMask: [] },
        /* 33 */ { x: 59, y: 26, cMask: [] },
        /* 34 */ { x: -55, y: 18, cMask: [] },
        /* 35 */ { x: 72, y: 8, cMask: [] },
        /* 36 */ { x: -36, y: 38, cMask: [] },
        /* 37 */ { x: -15, y: 46, cMask: [] },
        /* 38 */ { x: 50, y: 34, cMask: [] },
        /* 39 */ { x: 75, y: -17, cMask: [] },
        /* 40 */ { x: -76, y: -13, cMask: [] },
        /* 41 */ { x: 72, y: -24, cMask: [] },
        /* 42 */ { x: -75, y: -18, cMask: [] },
        /* 43 */ { x: 63, y: -33, cMask: [] },
        /* 44 */ { x: -68, y: -26, cMask: [] },
        /* 45 */ { x: 48, y: -42, cMask: [] },
        /* 46 */ { x: -62, y: -34, cMask: [] },
        /* 47 */ { x: 66, y: 19, cMask: [] },
        /* 48 */ { x: 33, y: -49, cMask: [] },
        /* 49 */ { x: -44, y: -44, cMask: [] },
        /* 50 */ { x: 64, y: -5, cMask: [] },
        /* 51 */ { x: -35, y: 1, cMask: [] },
        /* 52 */ { x: 46, y: 0, cMask: [] },
        /* 53 */ { x: -59, y: -12, cMask: [] },
        /* 54 */ { x: 57, y: -14, cMask: [] },
        /* 55 */ { x: -38, y: -18, cMask: [] },
        /* 56 */ { x: 33, y: -19, cMask: [] },
        /* 57 */ { x: -4, y: -36, cMask: [], curve: 0 },
        /* 58 */ { x: 2, y: 31, cMask: [], curve: 0 },
        /* 59 */ { x: 6, y: -37, cMask: [] },
        /* 60 */ { x: 3, y: 31, cMask: [], curve: 0 },
        /* 61 */ { x: -8, y: -38, cMask: [] },
        /* 62 */ { x: -4, y: 28, cMask: [] },
        /* 63 */ { x: -15, y: -33, cMask: [] },
        /* 64 */ { x: -11, y: 25, cMask: [] },
        /* 65 */ { x: -23, y: -31, cMask: [] },
        /* 66 */ { x: -20, y: 22, cMask: [] },
        /* 67 */ { x: -29, y: -18, cMask: [] },
        /* 68 */ { x: -26, y: 13, cMask: [] },
        /* 69 */ { x: 13, y: -35, cMask: [] },
        /* 70 */ { x: 15, y: 26, cMask: [] },
        /* 71 */ { x: 22, y: -30, cMask: [] },
        /* 72 */ { x: 22, y: 21, cMask: [] },
        /* 73 */ { x: 28, y: -22, cMask: [] },
        /* 74 */ { x: 28, y: 17, cMask: [] },
        /* 75 */ { x: 26, y: 12, cMask: [] },
        /* 76 */ { x: -33, y: -8, cMask: [] },
        /* 77 */ { x: 33, y: -7, cMask: [] },
        /* 78 */ { x: -33, y: 8, cMask: [] },
        /* 79 */ { x: 33, y: 7, cMask: [] },
        /* 80 */ { x: -32, y: 18, cMask: [] },
        /* 81 */ { x: -30, y: 0, cMask: [] },
        /* 82 */ { x: 35, y: 0, cMask: [] },
        /* 83 */ { x: -25, y: -12, cMask: [] },
        /* 84 */ { x: 27, y: -12, cMask: [] },
        /* 85 */ { x: 16, y: -29, cMask: [] },
        /* 86 */ { x: -20, y: 29, cMask: [] },
        /* 87 */ { x: -15, y: -26, cMask: [] },
        /* 88 */ { x: 22, y: -23, cMask: [] },
        /* 89 */ { x: -28, y: -23, cMask: [] },
        /* 90 */ { x: -3, y: -33, cMask: [] },
        /* 91 */ { x: -22, y: -24, cMask: [] },
        /* 92 */ { x: -20, y: 15, cMask: [] },
        /* 93 */ { x: -18, y: 9, cMask: [] },
        /* 94 */ { x: -25, y: 4, cMask: [] },
        /* 95 */ { x: 13, y: 16, cMask: [] },
        /* 96 */ { x: 2, y: -32, cMask: [] },
        /* 97 */ { x: 2, y: 17, cMask: [], curve: 180 },
        /* 98 */ { x: -12, y: 12, cMask: [] },
        /* 99 */ { x: 1, y: -21, cMask: [], curve: 180 },
        /* 100 */ { x: -11, y: -14, cMask: [] },
        /* 101 */ { x: 12, y: -13, cMask: [] },
        /* 102 */ { x: 7, y: -18, cMask: [] },
        /* 103 */ { x: 7, y: 14, cMask: [] },
        /* 104 */ { x: -6, y: -18, cMask: [] },
        /* 105 */ { x: -5, y: 12, cMask: [] },
        /* 106 */ { x: -17, y: -2, cMask: [] },
        /* 107 */ { x: 19, y: -3, cMask: [] },
        /* 108 */ { x: 16, y: 6, cMask: [] },
        /* 109 */ { x: -13, y: 5, cMask: [] },
        /* 110 */ { x: -16, y: -9, cMask: [] },
        /* 111 */ { x: 16, y: -9, cMask: [] },
        /* 112 */ { x: 3, y: 10, cMask: [] },
        /* 113 */ { x: 10, y: 7, cMask: [] },
        /* 114 */ { x: -19, y: 3, cMask: [] },
        /* 115 */ { x: -3, y: -13, cMask: [] },
        /* 116 */ { x: 7, y: 0, cMask: [] },
        /* 117 */ { x: -8, y: -25, cMask: [], curve: -180 },
        /* 118 */ { x: -8, y: -1, cMask: [], curve: -180 },
        /* 119 */ { x: -3, y: -3, cMask: [] },
        /* 120 */ { x: -13, y: -21, cMask: [] },
        /* 121 */ { x: -18, y: -18, cMask: [] },
        /* 122 */ { x: -1, y: 241, bCoef: 1, cMask: [] },
        /* 123 */ { x: 0, y: -240, bCoef: 1, cMask: [] }
    ],

    segments: [
        { v0: 0, v1: 1, vis: true, color: "35c12b", trait: "ballArea" },
        { v0: 2, v1: 3, vis: true, color: "35c12b", trait: "ballArea" },
        { v0: 4, v1: 5, vis: true, color: "35c12b", trait: "ballArea" },
        { v0: 6, v1: 7, vis: true, color: "35c12b", trait: "ballArea" },

        { v0: 12, v1: 13, curve: -90, trait: "goalNet" },
        { v0: 13, v1: 14, trait: "goalNet" },
        { v0: 14, v1: 15, curve: -90, trait: "goalNet" },
        { v0: 16, v1: 17, curve: 90, trait: "goalNet" },
        { v0: 17, v1: 18, trait: "goalNet" },
        { v0: 18, v1: 19, curve: 90, trait: "goalNet" },

        { v0: 8, v1: 9, trait: "kickOffBarrier" },
        {
            v0: 9,
            v1: 10,
            curve: 180,
            color: "35c12b",
            cGroup: ["blueKO"],
            trait: "kickOffBarrier"
        },
        {
            v0: 9,
            v1: 10,
            curve: -180,
            color: "35c12b",
            cGroup: ["redKO"],
            trait: "kickOffBarrier"
        },
        { v0: 10, v1: 11, color: "35c12b", trait: "kickOffBarrier" },

        {
            v0: 20,
            v1: 21,
            curve: 72.72096925804993,
            color: "ffffff",
            cMask: []
        },
        { v0: 21, v1: 22, curve: 70.7249237741381, color: "ffffff", cMask: [] },
        {
            v0: 22,
            v1: 23,
            curve: 78.91505740783286,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 20,
            v1: 24,
            curve: 35.198502354255226,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 24,
            v1: 23,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 20,
            v1: 22,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 20,
            v1: 25,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 26,
            v1: 25,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 27,
            v1: 25,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 28,
            v1: 25,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 24,
            v1: 29,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 30,
            v1: 31,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 32,
            v1: 33,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 34,
            v1: 29,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 30,
            v1: 35,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 36,
            v1: 31,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 37,
            v1: 38,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 27,
            v1: 29,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 24,
            v1: 35,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 22,
            v1: 20,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 39,
            v1: 40,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 41,
            v1: 42,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 43,
            v1: 44,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 45,
            v1: 46,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 36,
            v1: 47,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 39,
            v1: 40,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 48,
            v1: 49,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 43,
            v1: 42,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        {
            v0: 45,
            v1: 46,
            curve: -47.01227561071817,
            color: "ffffff",
            cMask: []
        },
        { v0: 20, v1: 22, curve: 0, color: "ffffff", cMask: [] },
        { v0: 26, v1: 50, curve: 0, color: "ffffff", cMask: [] },
        { v0: 51, v1: 52, curve: 0, color: "ffffff", cMask: [] },
        { v0: 53, v1: 54, curve: 0, color: "ffffff", cMask: [] },
        { v0: 55, v1: 56, curve: 0, color: "ffffff", cMask: [] },
        { v0: 57, v1: 58, curve: 180, color: "916335", cMask: [] },
        { v0: 58, v1: 57, curve: 180, color: "916335", cMask: [] },
        { v0: 59, v1: 58, curve: 0, color: "916335", cMask: [] },
        { v0: 57, v1: 62, curve: 0, color: "916335", cMask: [] },
        { v0: 61, v1: 64, curve: 0, color: "916335", cMask: [] },
        { v0: 59, v1: 70, curve: 0, color: "916335", cMask: [] },
        { v0: 63, v1: 66, curve: 0, color: "916335", cMask: [] },
        { v0: 69, v1: 72, curve: 0, color: "916335", cMask: [] },
        { v0: 65, v1: 68, curve: 0, color: "916335", cMask: [] },
        { v0: 71, v1: 75, curve: 0, color: "916335", cMask: [] },
        { v0: 76, v1: 77, curve: 0, color: "916335", cMask: [] },
        { v0: 78, v1: 79, curve: 0, color: "916335", cMask: [] },
        { v0: 67, v1: 73, curve: 0, color: "916335", cMask: [] },
        { v0: 80, v1: 74, curve: 0, color: "916335", cMask: [] },
        { v0: 81, v1: 82, curve: 0, color: "916335", cMask: [] },
        { v0: 81, v1: 82, curve: 0, color: "916335", cMask: [] },
        { v0: 68, v1: 75, curve: 0, color: "916335", cMask: [] },
        { v0: 83, v1: 84, curve: 0, color: "916335", cMask: [] },
        { v0: 65, v1: 85, curve: 0, color: "916335", cMask: [] },
        { v0: 86, v1: 70, curve: 0, color: "916335", cMask: [] },
        { v0: 64, v1: 72, curve: 0, color: "916335", cMask: [] },
        { v0: 87, v1: 88, curve: 0, color: "916335", cMask: [] },
        { v0: 83, v1: 73, curve: 0, color: "916335", cMask: [] },
        { v0: 68, v1: 74, curve: 0, color: "916335", cMask: [] },
        { v0: 89, v1: 78, curve: 0, color: "916335", cMask: [] },
        { v0: 73, v1: 79, curve: 0, color: "916335", cMask: [] },
        { v0: 90, v1: 62, curve: 0, color: "916335", cMask: [] },
        { v0: 59, v1: 58, curve: 0, color: "916335", cMask: [] },
        { v0: 63, v1: 64, curve: 0, color: "916335", cMask: [] },
        { v0: 69, v1: 70, curve: 0, color: "916335", cMask: [] },
        { v0: 65, v1: 68, curve: 0, color: "916335", cMask: [] },
        { v0: 85, v1: 75, curve: 0, color: "916335", cMask: [] },
        { v0: 59, v1: 60, curve: 0, color: "916335", cMask: [] },
        { v0: 90, v1: 64, curve: 0, color: "916335", cMask: [] },
        { v0: 88, v1: 75, curve: 0, color: "916335", cMask: [] },
        { v0: 91, v1: 78, curve: 0, color: "916335", cMask: [] },
        { v0: 78, v1: 79, curve: 0, color: "916335", cMask: [] },
        { v0: 83, v1: 84, curve: 0, color: "916335", cMask: [] },
        { v0: 90, v1: 58, curve: 0, color: "916335", cMask: [] },
        { v0: 83, v1: 84, curve: 0, color: "916335", cMask: [] },
        { v0: 67, v1: 88, curve: 0, color: "916335", cMask: [] },
        { v0: 91, v1: 59, curve: 0, color: "916335", cMask: [] },
        { v0: 69, v1: 73, curve: 0, color: "916335", cMask: [] },
        { v0: 84, v1: 75, curve: 0, color: "916335", cMask: [] },
        { v0: 75, v1: 60, curve: 0, color: "916335", cMask: [] },
        { v0: 60, v1: 92, curve: 0, color: "916335", cMask: [] },
        { v0: 64, v1: 68, curve: 0, color: "916335", cMask: [] },
        { v0: 91, v1: 93, curve: 0, color: "916335", cMask: [] },
        { v0: 83, v1: 94, curve: 0, color: "916335", cMask: [] },
        { v0: 88, v1: 72, curve: 0, color: "916335", cMask: [] },
        { v0: 85, v1: 95, curve: 0, color: "916335", cMask: [] },
        { v0: 96, v1: 97, curve: 0, color: "916335", cMask: [] },
        { v0: 85, v1: 95, curve: 0, color: "916335", cMask: [] },
        { v0: 91, v1: 93, curve: 0, color: "916335", cMask: [] },
        { v0: 63, v1: 98, curve: 0, color: "916335", cMask: [] },
        { v0: 99, v1: 97, curve: -180, color: "2a0a0b", cMask: [] },
        { v0: 99, v1: 97, curve: 180, color: "2a0a0b", cMask: [] },
        { v0: 99, v1: 97, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 99, v1: 97, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 100, v1: 98, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 101, v1: 95, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 102, v1: 103, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 104, v1: 105, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 106, v1: 107, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 100, v1: 101, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 98, v1: 108, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 109, v1: 108, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 101, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 111, v1: 110, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 108, v1: 109, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 109, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 105, v1: 107, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 106, v1: 102, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 104, v1: 108, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 100, v1: 103, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 105, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 102, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 103, v1: 108, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 104, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 99, v1: 105, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 104, v1: 109, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 111, v1: 103, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 102, v1: 97, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 108, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 106, v1: 103, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 104, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 101, v1: 105, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 99, v1: 109, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 102, v1: 105, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 111, v1: 103, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 105, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 100, v1: 112, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 104, v1: 113, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 102, v1: 108, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 111, v1: 106, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 114, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 105, v1: 107, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 110, v1: 102, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 97, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 105, v1: 111, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 109, v1: 102, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 108, v1: 104, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 97, v1: 115, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 107, v1: 116, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 105, v1: 110, curve: 0, color: "2a0a0b", cMask: [] },
        { v0: 117, v1: 118, curve: 180, color: "ffffff", cMask: [] },
        { v0: 117, v1: 118, curve: -180, color: "ffffff", cMask: [] },
        { v0: 117, v1: 118, curve: 0, color: "ffffff", cMask: [] },
        { v0: 99, v1: 119, curve: 0, color: "ffffff", cMask: [] },
        { v0: 120, v1: 106, curve: 0, color: "ffffff", cMask: [] },
        { v0: 120, v1: 115, curve: 0, color: "ffffff", cMask: [] },
        { v0: 121, v1: 115, curve: 0, color: "ffffff", cMask: [] },
        { v0: 110, v1: 119, curve: 0, color: "ffffff", cMask: [] },
        { v0: 120, v1: 104, curve: 0, color: "ffffff", cMask: [] },
        { v0: 121, v1: 115, curve: 0, color: "ffffff", cMask: [] },
        { v0: 121, v1: 115, curve: 0, color: "ffffff", cMask: [] },
        { v0: 121, v1: 115, curve: 0, color: "ffffff", cMask: [] },
        { v0: 117, v1: 115, curve: 0, color: "ffffff", cMask: [] },
        {
            v0: 20,
            v1: 30,
            curve: 25.518463756889155,
            color: "000000",
            cMask: []
        },
        {
            v0: 30,
            v1: 23,
            curve: -44.27915252999827,
            color: "000000",
            cMask: []
        },
        {
            v0: 23,
            v1: 22,
            curve: -78.96373913468994,
            color: "000000",
            cMask: []
        },
        { v0: 22, v1: 21, curve: -68.034625178466, color: "000000", cMask: [] },
        {
            v0: 21,
            v1: 20,
            curve: -70.40351398508517,
            color: "000000",
            cMask: []
        },
        {
            v0: 57,
            v1: 58,
            curve: 187.02227119379629,
            color: "000000",
            cMask: []
        },
        { v0: 117, v1: 118, curve: -180, color: "000000", cMask: [] },
        { v0: 117, v1: 118, curve: 180, color: "000000", cMask: [] },
        { v0: 6, v1: 5, curve: 0, color: "916335", cMask: [] },
        { v0: 2, v1: 1, curve: 0, color: "916335", cMask: [] },
        {
            v0: 61,
            v1: 60,
            curve: -167.8015157638721,
            color: "000000",
            cMask: []
        },
        { v0: 61, v1: 59, curve: 0, color: "000000", cMask: [] },

        {
            v0: 3,
            v1: 7,
            curve: 0,
            vis: true,
            color: "35c12b",
            bCoef: 1,
            cMask: [],
            trait: "ballArea"
        },
        {
            v0: 4,
            v1: 0,
            curve: 0,
            vis: true,
            color: "35c12b",
            bCoef: 1,
            cMask: [],
            trait: "ballArea"
        },
        {
            v0: 9,
            v1: 122,
            curve: 0,
            vis: true,
            color: "35c12b",
            bCoef: 1,
            cMask: [],
            trait: "ballArea"
        },

        { v0: 123, v1: 10, curve: 0, vis: true, color: "35c12b", cMask: [] },
        { v0: 10, v1: 9, curve: 180, vis: true, color: "35c12b", cMask: [] },
        { v0: 10, v1: 9, curve: -180, vis: true, color: "35c12b", cMask: [] },
        { v0: 6, v1: 5, curve: 0, vis: true, color: "ffffff", cMask: [] },
        { v0: 2, v1: 1, curve: 0, vis: true, color: "ffffff", cMask: [] }
    ],

    goals: [
        { p0: [-550, 80], p1: [-550, -80], team: "red" },
        { p0: [550, 80], p1: [550, -80], team: "blue" }
    ],

    discs: [
        { pos: [-550, 80], color: "FFCCCC", trait: "goalPost" },
        { pos: [-550, -80], color: "FFCCCC", trait: "goalPost" },
        { pos: [550, 80], color: "CCCCFF", trait: "goalPost" },
        { pos: [550, -80], color: "CCCCFF", trait: "goalPost" }
    ],

    planes: [
        { normal: [0, 1], dist: -240, trait: "ballArea", color: "35c12b" },
        { normal: [0, -1], dist: -240, trait: "ballArea", color: "35c12b" },

        { normal: [0, 1], dist: -540, bCoef: 0.1 },
        { normal: [0, -1], dist: -540, bCoef: 0.1 },
        { normal: [1, 0], dist: -900, bCoef: 0.1 },
        { normal: [-1, 0], dist: -900, bCoef: 0.1 }
    ],

    traits: {
        cornerflag: {
            radius: 3,
            invMass: 0,
            bCoef: 0.5,
            color: "FFFF00",
            cGroup: [""]
        },
        ballArea: { vis: false, bCoef: 1, cMask: ["ball"], color: "35c12b" },
        goalPost: { radius: 8, invMass: 0, bCoef: 0.5 },
        goalNet: { vis: true, bCoef: 0.1, cMask: ["ball"] },
        kickOffBarrier: {
            vis: false,
            bCoef: 0.1,
            cGroup: ["redKO", "blueKO"],
            cMask: ["red", "blue"]
        }
    },

    playerPhysics: {
        bCoef: 1.5,
        invMass: 0.5,
        damping: 0.9995,
        acceleration: 0.025,
        kickingAcceleration: 0.0175,
        kickingDamping: 0.9995,
        kickStrength: 5
    },

    ballPhysics: {
        radius: 10,
        bCoef: 0.5,
        invMass: 1,
        damping: 0.99,
        color: "35c12b",
        cMask: ["all"],
        cGroup: ["ball"]
    }
};
