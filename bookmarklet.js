async function init() {
    /* https://mrcoles.com/bookmarklet/ */
    const cssFetch = await fetch("https://raw.githubusercontent.com/nthitz/pluggedTT/master/source/myStyles.css");
    const cssText = await cssFetch.text();
    const style = document.createElement('style');
    style.innerHTML = cssText;
    document.body.appendChild(style);

    const templateFetch = await fetch("https://raw.githubusercontent.com/nthitz/pluggedTT/master/source/modal.html");
    const templateText = await templateFetch.text();
    const modal = document.createElement('template');
    modal.id = 'pluggedTTModal';
    modal.innerHTML = templateText;
    document.body.appendChild(modal);


    const scriptFetch = await fetch("https://raw.githubusercontent.com/nthitz/pluggedTT/master/source/localContextScript.js.txt");
    const scriptSrc = await scriptFetch.text();
    const script = document.createElement('script');
    script.innerHTML = scriptSrc;
    document.body.appendChild(script);


}

init()