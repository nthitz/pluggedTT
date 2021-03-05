import browser from 'webextension-polyfill';
import optionsStorage from './options-storage';


const runTurntableCode = async () => {
    const { autobop, volume } = await optionsStorage.getAll()

    // configure autobopping, check every 10 seconds
    setInterval(async () => {
        const { autobop } = await optionsStorage.getAll()
        const button = document.querySelector('.awesome-button:not(.selected)')
        if (button && autobop) {
            button.click()
        }
    }, 10000)

    // remove old existing modal if there is one
    let pluggedTTContainer = document.querySelector('.pluggedTT')
    if (pluggedTTContainer) {
        exists.parentElement.removeChild(pluggedTTContainer)
    }
    
    // inject our  into the page
    pluggedTTContainer = document.createElement('div')    
    pluggedTTContainer.classList.add('pluggedTT')
    const template = await fetch(browser.runtime.getURL('/modal.html'))
    const content = await template.text()
    pluggedTTContainer.innerHTML = content    
    document.body.appendChild(pluggedTTContainer)
    
    // hook up volume input
    const volumeInput = pluggedTTContainer.querySelector('.volumeInput')
    volumeInput.value = volume
    // can't use onInput as number of events overwhelms optionsStorage.set limit on calls per minute
    // could try to enginner something more complicated with sendMessage but uhh...
    volumeInput.addEventListener('change', async (event) => { 
        const volume = +event.target.value;
        await optionsStorage.set({ volume })
    })


    // hook up autobopper
    const autobopInput = pluggedTTContainer.querySelector('.autobopInput')
    autobopInput.checked = autobop
    autobopInput.addEventListener('change', async (event) => {
        const autobop = event.target.checked
        await optionsStorage.set({ autobop })
    })
}


let lastPrint = () => {
    let last = null
    return (value) => {
        if (last !== value) {
            console.log(value)
            last = value
        }
    }
}
const p = lastPrint()
const updateVideoVolume = async () => {
    const video = document.querySelector('video')
    const { volume } = await optionsStorage.getAll()
    if (video) {
        p(volume)
        if (volume !== video.volume) {
            video.volume = volume
            console.log(video.volume)
        }
    }
}

// we want to constantly set the video volume just in case
const runYoutubeCode = () => {
    const loop = () => {
        updateVideoVolume()
        requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
}


const init = async () => {
    // perhaps these should be different content scripts! hmm yeah definitely!
    if (document.location.hostname.match(/turntable.fm/)) {
        runTurntableCode()
    }
    if (document.location.hostname.match(/youtube.com/)) {
        runYoutubeCode()
    }
    
}
init()
