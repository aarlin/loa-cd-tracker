import { skills } from '../../../constants/skills';

export const getCooldownBySkillName = (skillName: string): number => {
    const skill = skills.find(skill => skill.name === skillName);
    return skill?.cooldown ?? 0;
};

export const getCooldownBySkillId = (skillId: string): number => {
    const skill = skills.find(skill => skill.id === parseInt(skillId));
    return skill?.cooldown ?? 0;
};

export const getClassBySkillId = (skillId: string): string => {
    const skillAssociated = skills.find(skill => skill.id === parseInt(skillId));
    return skillAssociated?.class ?? 'unknown';
}