function i(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,n(i,t)}function n(i,t){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,n){return i.__proto__=n,i},n(i,t)}function t(i,n,t,e){if(void 0===n&&(n=0),void 0===t&&(t=10),void 0===e&&(e=!1),"number"==typeof i)return isNaN(i)?n:i;var o;try{o=e?parseFloat(i):parseInt(i,t),isNaN(o)&&(o=n)}catch(i){o=n}return o}var e=function(i){this.lineSplit=void 0,this.timestamp=void 0,this.lineSplit=i,this.timestamp=new Date(this.lineSplit[1])},o=/*#__PURE__*/function(n){function t(i){var t;return(t=n.call(this,i)||this).message=void 0,t.message=t.lineSplit[2],t}return i(t,n),t}(e),r=/*#__PURE__*/function(n){function t(i){var t;return(t=n.call(this,i)||this).playerId=void 0,t.playerId=i[2],t}return i(t,n),t}(e),d=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).phaseCode=void 0,e.phaseCode=t(i[2]),e}return i(e,n),e}(e),a=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.name=void 0,e.classId=void 0,e.class=void 0,e.gearScore=void 0,e.currentHp=void 0,e.maxHp=void 0,e.id=i[2],e.name=i[3]||"Unknown Entity",e.classId=t(i[4]),e.class=i[5]||"UnknownClass",e.gearScore=t(i[7],0,10,!0),e.currentHp=t(i[8]),e.maxHp=t(i[9]),e}return i(e,n),e}(e),l=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.npcId=void 0,e.name=void 0,e.currentHp=void 0,e.maxHp=void 0,e.id=i[2],e.npcId=t(i[3]),e.name=i[4]||"Unknown Entity",e.currentHp=t(i[5]),e.maxHp=t(i[6]),e}return i(e,n),e}(e),s=/*#__PURE__*/function(n){function t(i){var t;return(t=n.call(this,i)||this).id=void 0,t.name=void 0,t.killerId=void 0,t.killerName=void 0,t.id=i[2],t.name=i[3]||"Unknown Entity",t.killerId=i[4],t.killerName=i[5]||"Unknown Entity",t}return i(t,n),t}(e),u=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.name=void 0,e.skillId=void 0,e.skillName=void 0,e.id=i[2],e.name=i[3]||"Unknown Entity",e.skillId=t(i[4]),e.skillName=i[5]||"Unknown Skill",e}return i(e,n),e}(e),v=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.name=void 0,e.skillId=void 0,e.skillName=void 0,e.skillStage=void 0,e.id=i[2],e.name=i[3]||"Unknown Entity",e.skillId=i[4],e.skillName=i[5]||"Unknown Skill",e.skillStage=t(i[6]),e}return i(e,n),e}(e),c=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.name=void 0,e.skillId=void 0,e.skillName=void 0,e.skillEffectId=void 0,e.skillEffect=void 0,e.targetId=void 0,e.targetName=void 0,e.damage=void 0,e.damageModifier=void 0,e.currentHp=void 0,e.maxHp=void 0,e.id=i[2],e.name=i[3]||"Unknown Entity",e.skillId=t(i[4]),e.skillName=i[5]||"Unknown Skill",e.skillEffectId=t(i[6]),e.skillEffect=i[7],e.targetId=i[8],e.targetName=i[9]||"Unknown Entity",e.damage=t(i[10]),e.damageModifier=t(i[11],0,16),e.currentHp=t(i[12]),e.maxHp=t(i[13]),e}return i(e,n),e}(e),m=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.name=void 0,e.healAmount=void 0,e.id=i[2],e.name=i[3]||"Unknown Entity",e.healAmount=t(i[4]),e}return i(e,n),e}(e),f=/*#__PURE__*/function(n){function e(i){var e;return(e=n.call(this,i)||this).id=void 0,e.name=void 0,e.buffId=void 0,e.buffName=void 0,e.isNew=void 0,e.sourceId=void 0,e.sourceName=void 0,e.shieldAmount=void 0,e.id=i[2],e.name=i[3]||"Unknown Entity",e.buffId=i[4],e.buffName=i[5],e.isNew="1"==i[6],e.sourceId=i[7],e.sourceName=i[8]||"Unknown Entity",e.shieldAmount=t(i[9]),e}return i(e,n),e}(e),k=/*#__PURE__*/function(n){function t(i){var t;return(t=n.call(this,i)||this).id=void 0,t.name=void 0,t.id=i[2],t.name=i[3]||"Unknown Entity",t}return i(t,n),t}(e);export{f as LogBuff,k as LogCounterattack,c as LogDamage,s as LogDeath,m as LogHeal,r as LogInitEnv,o as LogMessage,l as LogNewNpc,a as LogNewPc,d as LogPhaseTransition,v as LogSkillStage,u as LogSkillStart};
//# sourceMappingURL=log-lines.module.js.map