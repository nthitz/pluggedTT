import browser from 'webextension-polyfill';

const addLocalContextScript = async () => {
    const modalTemplate = document.createElement('template')
    modalTemplate.id='pluggedTTModal'
    const modalUrl = browser.runtime.getURL('/modal.html')
    const modalFetch = await fetch(modalUrl)
    const modalSource = await modalFetch.text()
    modalTemplate.innerHTML = modalSource
    document.body.appendChild(modalTemplate)


    const script = document.createElement('script')
    const sourceURL = browser.runtime.getURL('/localContextScript.js.txt')
    console.log(sourceURL)
    const sourceFetch = await fetch(sourceURL)
    const source = await sourceFetch.text()
    script.innerHTML = source
    document.body.appendChild(script)

}

const init =  () => {
    console.log('init pluggedTT')
    addLocalContextScript()
}
init()

