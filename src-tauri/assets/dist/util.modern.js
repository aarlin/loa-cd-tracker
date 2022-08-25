function t(t,r=0,e=10,a=!1){if("number"==typeof t)return isNaN(t)?r:t;let n;try{n=a?parseFloat(t):parseInt(t,e),isNaN(n)&&(n=r)}catch(t){n=r}return n}export{t as tryParseInt};
//# sourceMappingURL=util.modern.js.map
