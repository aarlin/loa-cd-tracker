function r(r,t,a,e){if(void 0===t&&(t=0),void 0===a&&(a=10),void 0===e&&(e=!1),"number"==typeof r)return isNaN(r)?t:r;var i;try{i=e?parseFloat(r):parseInt(r,a),isNaN(i)&&(i=t)}catch(r){i=t}return i}export{r as tryParseInt};
//# sourceMappingURL=util.module.js.map
