

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}
class SoundFabric {
    constructor(path) {
        this.path = path;
        this.audio = null;
    }

    play() {
        if (this.audio == null) {
            this.audio = new Audio(this.path);
        }
        this.audio.play();
    };

    stop() {
        if (this.audio != null) {
            this.audio.pause();
        }
        this.audio = null;
    }; 
}

function createKeySoundDict(){
    let audioNames = [
        "tom-1.mp3","tom-2.mp3", "tom-3.mp3", "tom-4.mp3",
        "crash.mp3","kick-bass.mp3","snare.mp3"
    ].map(x => new SoundFabric("sounds/" + x));
    
    let keys = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
    let keySoundDict = {};
    keys.forEach((key, ind) => {
        keySoundDict[key] = audioNames[ind];
    });
    return  keySoundDict
}

keySoundDict = createKeySoundDict();

function createTimerCntDict() {
    res = {}
    let keys = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
    keys.forEach(key => {
        res[key] = 0;
    });
    return res
}

timerCntDict = createTimerCntDict();


async function pressedButtonEffect(htmlElement) {
    const key = htmlElement.innerText;
    console.log(key);
    htmlElement.classList.add("pressed");
    timerCntDict[key]++;
    await sleep(2000);
    timerCntDict[key]--;
    if (timerCntDict[key] === 0){
        htmlElement.classList.remove("pressed");
    }
    
}


function addAllEventListenrs(){

    //touch 
    const drumObjects = document.querySelectorAll(".drum"); 
    drumObjects.forEach(element => {
        let key = element.innerText;
        let sound = keySoundDict[key];
        element.addEventListener("click", function() {
            pressedButtonEffect(this);
            sound.stop();
            sound.play();
        });
    });

    document.addEventListener("keydown", function(event) {
        document.querySelector("." + event.key).click()
    })
}






