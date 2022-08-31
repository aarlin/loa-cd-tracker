export interface CharacterItem {
    name: string;
    className?: string;
    classId?: string;
    skills: Skill[];
}

export interface Skill {
    id: string | number;
    name?: string;
    cooldown?: number;
    class?: string;
    level?: number;
    isOnCooldown?: boolean;
}

export interface Buff extends Skill {
    duration?: number;
}

export interface CharacterStoreState {
    characters: CharacterItem[];
    length: number;
}
