// AudioService.js
class AudioService {
    constructor() {
      this.audio = new Audio();
      this.currentFile = null;
    }
  
    play(file) {
      this.audio.src = URL.createObjectURL(file);
      this.audio.play();
      this.currentFile = file;
    }
  
    getCurrentTime() {
      return this.audio.currentTime;
    }
  
    setCurrentTime(time) {
      this.audio.currentTime = time;
    }
  }
  
  export default new AudioService();
  