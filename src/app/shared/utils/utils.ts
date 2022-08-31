import { skills } from '../../../constants/skills';
import { Skill } from '../models/character.model';
import { escapeSkills } from '../../../constants/escapeSkills';

export const getCooldownBySkillName = (skillName: string): number => {
    const skill = skills.find(skill => skill.name === skillName);
    return skill?.cooldown ?? 0;
};

export const getCooldownBySkillId = (skillId: string | number): number => {
    const skill = skills.find(skill => skill.id === +skillId);
    return skill?.cooldown ?? 0;
};

export const getClassBySkillId = (skillId: string | number): string => {
    const skillAssociated = skills.find(skill => skill.id === +skillId);
    return skillAssociated?.class ?? 'unknown';
};

export const populateInitialCharacterSkills = (className?: string, classId?: string): Skill[] => {
    // TODO: trigger which skill was activated using isAvailableToUse
    //
    if (className && className in escapeSkills) {
        return [ ...escapeSkills[className], ...Array(8).fill({ name: 'unknown', skill: 'unknown' })];
    }
    return Array(10).fill({ name: 'unknown', skill: 'unknown' });
};