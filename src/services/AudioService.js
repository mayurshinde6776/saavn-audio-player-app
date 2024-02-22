// AudioService.js
class AudioService {
  constructor() {
    this.audioPlayer = new Audio();
    this.playlist = [];
    this.currentSongIndex = 0;
    this.changeListeners = [];
    this.isPaused = true;
  }

  setPlaylist(playlist) {
    this.playlist = playlist;
  }

  playAudio(song, playedByCard = false) {
    this.currentSongIndex = this.playlist.indexOf(song);
    this.audioPlayer.src = song.audioDataUrl;

    // Add an event listener for the 'canplay' event
    this.audioPlayer.addEventListener('canplay', () => {
      // Check if the user has interacted
      if (playedByCard) {
        // Now that the audio has loaded, play it
        this.audioPlayer.play();
      }
    });

    // Add an event listener for the 'ended' event to handle continuous playback
    this.audioPlayer.addEventListener('ended', this.playNext.bind(this));

    // Notify change listeners about the new playback state
    this.notifyChange();

    // Save the current playing song to local storage
    localStorage.setItem('currentPlayingSong', JSON.stringify({
      base: song.audioDataUrl,
      offset: 0,  // Assuming starting from the beginning
    }));
  }
  
   handleUserInteraction = () => {
    // Remove the click event listener
    document.removeEventListener('click', this.handleUserInteraction);

    // Try playing the audio
    if (!this.isPaused) {
      this.audioPlayer.play();
    }
  };
  


  playNext() {
    // Increment the current song index
    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
  
    // Get the next song from the playlist
    const nextSong = this.playlist[this.currentSongIndex];
  
    // Play the next song
    if (nextSong) {
      this.playAudio(nextSong);
    }
  }

  playPrevious() {
    // Decrement the current song index
    this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;

    // Get the previous song from the playlist
    const previousSong = this.playlist[this.currentSongIndex];

    // Play the previous song
    if (previousSong) {
      this.playAudio(previousSong);
    }
  }

  getCurrentSong() {
    return this.playlist[this.currentSongIndex];
  }

  togglePause() {
    if (this.isPaused) {
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
    }

    this.isPaused = !this.isPaused;

    // Notify change listeners about the new playback state
    this.notifyChange();

    // Update local storage with the current time offset
    setInterval(() => {
      localStorage.setItem("audio_time", this.audioPlayer.currentTime);
    }, 100);
  }

  addChangeListener(callback) {
    this.changeListeners.push(callback);
  }

  removeChangeListener(callback) {
    this.changeListeners = this.changeListeners.filter(listener => listener !== callback);
  }

  notifyChange() {
    this.changeListeners.forEach(listener => listener());
  }

  saveState() {
    // Save the current song index and paused state to local storage
    localStorage.setItem('audioPlayerState', JSON.stringify({
      currentSongIndex: this.currentSongIndex,
    }));
  }

  loadState() {
    // Load the saved state from local storage
    const savedState = JSON.parse(localStorage.getItem('audioPlayerState')) || {};
    this.currentSongIndex = savedState.currentSongIndex || 0;

    // If there is a saved current song index, fetch the song from the playlist
    const currentSong = this.playlist[this.currentSongIndex];
    if (currentSong) {
      this.playAudio(currentSong);
    }
  }

  loadLastPlayingSong() {
    // Load the last playing song from local storage
    const lastPlayingSong = JSON.parse(localStorage.getItem('currentPlayingSong')) || {};

    // If there is a last playing song, fetch the song from the playlist
    const song = this.playlist.find(song => song.audioDataUrl === lastPlayingSong.base);
    if (song) {
      this.playAudio(song);
      this.audioPlayer.currentTime = lastPlayingSong.offset || 0;
    }
  }
}

export default new AudioService();
