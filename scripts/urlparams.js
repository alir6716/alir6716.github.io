// urlparams.js, Created by AR.
var urlparams={search:function(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||void 0},hash:function(e){return decodeURIComponent((new RegExp("[#|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.hash)||[,""])[1].replace(/\+/g,"%20"))||void 0}};
