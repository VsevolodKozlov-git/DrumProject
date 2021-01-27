var drumObjects = document.querySelectorAll(".drum"); 


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

function createDict(){
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

keySoundDict = createDict();

drumObjects.forEach(element => {
    let key = element.innerText;
    let sound = keySoundDict[key];
    element.addEventListener("click", function() {
        sound.stop();
        sound.play();
    });
});

document.addEventListener("keydown", function(event) {
    sound =  keySoundDict[event.key];
    sound.stop();
    sound.play();
 
})


// for (let index = 0; index < drumObjects.length; index++) {
//     const element = drumObjects[index];
//     element.addEventListener("click", 
//     function (){
//         audioNames[index].play();
//     });
// }

// document.addEventListener("keydown", function(event){
//     let kCode = event.key;
//     console.log("." + kCode);
//     document.querySelector("." + kCode).click();
   
// })
