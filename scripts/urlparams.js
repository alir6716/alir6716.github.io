// urlparams.js, Created by AR.
function getURLParameter(e){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||void 0}function getHashParameter(e){return decodeURIComponent((new RegExp("[#|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.hash)||[,""])[1].replace(/\+/g,"%20"))||void 0}

