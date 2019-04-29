//Browser related variables
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
    isFirefox = typeof InstallTrigger !== 'undefined',
    isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    isIE = /*@cc_on!@*/false || !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia;

//Popup related variables
const pop = document.querySelector('.pop-wrap'),
    popBox = document.querySelector('.pop-wrap .pop-content'),
    popText = document.querySelector('.pop-wrap .pop-content h3'),
    close = document.querySelector('.pop-wrap .pop-content .close'),
    btn = document.querySelector('.btn'),
    body = document.querySelector('body');

//Code related to browser specific popup...
btn.onclick = () => {
    body.style.overflow = 'hidden';
    pop.style.display = 'block';
    if(isChrome === true || isSafari === true) {
        popBox.style = `
                top: 0;
                right: 0
              `;
    }else if(isFirefox === true) {
        popBox.style = `
                top: 0;
                left: 0;
              `;
    }else if(isEdge === true) {
        popBox.style = `
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto
              `;
    }else {
        popBox.style = `
                top: 50%;
                left: 0;
                right: 0;
                margin: -75px auto 0 auto;
              `;
        popText.innerHTML = "Browser Not Supported.";
    }
};

close.onclick = () => {
    pop.style.display = 'none';
    body.style.overflow = 'auto';
};
