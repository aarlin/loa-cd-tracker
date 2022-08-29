export interface CharacterItem {
    name: string;
    className?: string;
    classId?: string;
    skills: Skill[];
}

export interface Skill {
    name: string;
    id?: string;
    cooldown?: number;
    isAvailableToUse?: boolean;
}

export interface CharacterStoreState {
    characters: CharacterItem[];
    length: number;
}
