function showQuote(){
    const array = [
        "शयानं चानुशेते हि तिष्ठन्तं चानुतिष्ठति । अनुधावति धावन्तं कर्म पूर्वकृतं नरम् ॥",
        "अनुच्छेदं चानुशेते हि तिष्ठन्तं चानुतिष्ठति । अनुधावति धावन्तं कर्म पूर्वकृतं नरम् ॥",
       "जीवनं अनंतं नृत्यति यदि नाश्रयो याति",
        "यत्र धर्मस्तत्र जयः",
        "जीवनं अनंतं नृत्यति यदि नाश्रयो याति",
        "मनो बुद्ध्यहंकार चित्तानि नाहम्"
    ]

    const random = Math.random();
    const randomIndex = Math.floor(random * array.length);
    
    document.getElementById("quotes").innerHTML = array[randomIndex];


}