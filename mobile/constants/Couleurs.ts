// Les petites couleurs de mon app
export const couleurs = {
    darkGreen: "#002A00",
    lightGreen: "#71D561",
    grey: "#F1F1F3",
    darkGrey: "#D6D6D8",
    black: "#1A1A1A",
    lightRed: '#ED7437',
    darkRed: '#7E2C03',
    bluePastel: '#AEC6CF',
    blue: '#2196F3',
    darkBlue: "#1E3A64",
    fineBlue: "#dce9fe",
    primary: "#1976D2", 
    white: "#FFFFFF",
} as const;

export type Couleurs = typeof couleurs;
