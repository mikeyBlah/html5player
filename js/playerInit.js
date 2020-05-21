// ONLOAD ---
window.addEventListener("load", async function() {
  await createPlayer();
  await assignValues();
  await addControlEventListeners();
  await addPlayerEventListeners();
  await createTiles();
  updateHandler;
})

const createPlayer = () => {
  const container = document.querySelector('.gnome-container');
  source.src = videoConfig[playlistValue].url;
  video.appendChild(source);
  video.classList.add("video-player");
  video.controls = false;
  container.appendChild(video);
  video.muted = true;
  video.play();
  isMuted = video.muted;
}
// ADD ELEMENT VALUES TO VARIABLES ---
const assignValues = () => {
  seekBar = document.querySelector('.progress-bar');
  playOverlay = document.querySelector('.play-overlay');
  overlay = document.querySelector('.gnome-overlay');
  playPauseBtn = document.querySelector('.play-pause-btn');
  muteBtn = document.querySelector('.mute-btn');
  fullScreenBtn = document.querySelector('.fullscreen-btn');
  overlay = document.querySelector('.gnome-overlay');
  volumeBar = document.querySelector('.volume-bar-container');
  innerVolumeBar = document.querySelector('.volume-bar');
  timeWidget = document.querySelector('.time-widget');
  progressMarker = document.querySelector('.progress-marker');
  upNextOverlay = document.querySelector('.up-next-overlay');
  playUpNext = document.querySelector('.play-up-next');
  return
}
// ADD EVENT LISTENERS TO ELEMENTS ---
const addControlEventListeners = () => {
  playPauseBtn.addEventListener("click", overlayClickHandler);
  overlay.addEventListener("click", overlayClickHandler);
  muteBtn.addEventListener("click", muteClickHandler);
  fullScreenBtn.addEventListener("click", screenClickHandler);
  seekBar.addEventListener("mousedown", seekHandler);
  seekBar.addEventListener("mouseenter", displayTimeWidget);
  volumeBar.addEventListener("mousedown", volumeHandler);
  playUpNext.addEventListener("click", endStateChanges);
  return
}

const addPlayerEventListeners = () => {
  video.addEventListener("playing", function() {
    videoState = "playing";
  });
  video.addEventListener("pause", function() {
    videoState = "paused";
  });
  return
}

// UPDATE HANDLER INTERVAL ---
const updateHandler = setInterval(function() {
  updateVideoState();
  updateProgress();
  updateIcons();
  if(upNext) {
    upnext();
  }
  checkEnded();
}, 500);