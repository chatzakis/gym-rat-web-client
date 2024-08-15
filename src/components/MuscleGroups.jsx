const muscleGroups = [
    { id: 10, name: "Chest", img: "chest" },
    { id: 11, name: "Upper Chest", img: "upper-chest" },
    { id: 12, name: "Middle Chest", img: "middle-chest" },
    { id: 13, name: "Lower Chest", img: "lower-chest" },

    { id: 20, name: "Back", img: "back" },
    { id: 21, name: "Upper Back", img: "upper-back" },
    { id: 22, name: "Middle Back", img: "middle-back" },
    { id: 23, name: "Lower Back", img: "lower-back" },

    { id: 30, name: "Shouldes", img: "shoulders" },
    { id: 31, name: "Front Delt", img: "front-delt" },
    { id: 32, name: "Middle Delt", img: "middle-delt" },
    { id: 33, name: "Rear Delt", img: "rear-delt" },

    { id: 40, name: "Arms", img: "arms" },
    { id: 41, name: "Biceps", img: "biceps" },
    { id: 42, name: "Triceps", img: "triceps" },
    { id: 43, name: "Forearms", img: "forearms" },

    { id: 50, name: "Abs", img: "abs" },
    { id: 51, name: "Upper abs", img: "upperAbs" },
    { id: 52, name: "Lower abs", img: "lowerAbs" },
    { id: 53, name: "Side abs", img: "sideAbs" },

    { id: 60, name: "Legs", img: "legs" },
    { id: 61, name: "Glutes", img: "glutes" },
    { id: 62, name: "Quads", img: "quads" },
    { id: 63, name: "Hamstrings", img: "hamstrings" },
    { id: 64, name: "Calves", img: "calves" },

    { id: 70, name: "Aerobic", img: "running" },
]

export default function MuscleGroupTitle(mg) {
    const muscleGroup = muscleGroups.find(x => x.id === Number(mg));
    return muscleGroup.name;
}

export function MuscleGroupImage(mg) {
    const muscleGroup = muscleGroups.find(x => x.id === Number(mg));
    return muscleGroup.img;
}

export function getSubGroups(mg) {
    const mgNum = Number(mg) - Number(mg) % 10;
    const muscleGroup = muscleGroups.filter(x => (x.id >= mgNum && x.id < mgNum + 10));
    return muscleGroup;
}
