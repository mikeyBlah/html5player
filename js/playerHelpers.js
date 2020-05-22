const updateVideoState = () => {
  console.log('###: videoState', videoState);
  switch(videoState) {
    case "playing":
      playStateChanges();
      break;
    case "paused":
      pauseStateChanges();
      break;
    case "ended":
      endStateChanges();
      break;
    default:
  };
}

const pauseStateChanges = () => {
  playOverlay.innerHTML = "";
  playOverlay.classList.add("active");
  overlay.classList.add("active");
}

const playStateChanges = () => {
  playOverlay.innerHTML = "||";
  overlay.classList.remove("active");
  playOverlay.classList.remove("active");
}

const endStateChanges = () => {
  if(playlistValue < videoConfig.length - 1) {
    playlistValue ++;
  } else {
    playlistValue = 0;
  }
  videoLoading = true;
  changeVideo();
}
// CONTROL FUNCTIONS ---
const overlayClickHandler = () => {
 videoState === "playing" ? video.pause() : video.play();
}

const screenClickHandler = () => {
  if(video.fullscreenElement) {
    video.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
 }

const seekHandler = () => {
  window.addEventListener("mouseup", seekToPoint);
}

const volumeHandler = () => {
  window.addEventListener("mouseup", changeVolume);
}

const displayTimeWidget = () => {
  timeWidget.classList.add('show');
  seekBar.addEventListener("mousemove", updateWidget);
  seekBar.addEventListener("mouseout", (evt) => {
    let e = evt.toElement || evt.relatedTarget;
      if (e.parentNode == seekBar || e == seekBar) {
          return;
      }
    seekBar.removeEventListener("mousemove", updateWidget);
    timeWidget.classList.remove('show');
  });
}

const updateWidget = (evt) => {
  const element = seekBar;
  const widgetText = timeWidget.querySelector('p');
  const seekPos = getMousePosInElement(element, evt);
  const formattedTime = formatTime(seekPos);
  widgetText.innerHTML = formattedTime;
  timeWidget.style.left = seekMousePos + element.offsetLeft + 'px';
}

const seekToPoint = (evt) => {
  const element = seekBar;
  const seekPos = getMousePosInElement(element, evt);
  video.currentTime = seekPos;
  window.removeEventListener("mouseup", seekToPoint);
}

const getMousePosInElement = (element, evt) => {
  const elmWidth = element.offsetWidth;
  const elmPos = element.getBoundingClientRect(); 
  seekMousePos = evt.pageX - elmPos.left;
  return seekMousePos / (elmWidth / video.duration);
}

const changeVolume = (evt) => {
  const containerWidth = volumeBar.offsetWidth;
  const volume = 1;
  const volumeBarPos = volumeBar.getBoundingClientRect(); 
  const mousePos = evt.pageX - volumeBarPos.left;
  storedVolume = mousePos / (containerWidth / volume);
  if(storedVolume < 0) {
    video.muted = true;
    video.volume = 0;
  } else {
    video.muted = false;
    video.volume = storedVolume;
  }
  window.removeEventListener("mouseup", changeVolume);
}

const muteClickHandler = () => {
  if(video.volume <= 0) {
    video.volume = .5;
    video.muted = !video.muted;
    isMuted = video.muted;
  } else {
    video.muted = !video.muted;
    isMuted = video.muted;
  }
  if(!video.muted) {
    video.volume = storedVolume;
  }
 }

const updateProgress = () => {
  const progressInner = document.querySelector('.progress-inner');
  const currentTimeDisplay = document.querySelector('.current-time');
  const duration = video.duration;
  const currentTime = video.currentTime;
  const currentFormatTime = formatTime(currentTime);
  const durationFormatTime = formatTime(duration);
  const barPercentage = currentTime  / duration * 100;
  const markerWidth = progressMarker.offsetWidth;
  progressInner.style.width = `${barPercentage}%`;
  currentTimeDisplay.innerHTML = `${currentFormatTime} / ${durationFormatTime}`;
  const barPixels = progressInner.offsetWidth - markerWidth / 2;
  progressMarker.style.left = barPixels + 'px';
}

const updateIcons = () => {
  const playIcon = playPauseBtn.querySelector(".fa");
  const overlayTitle = document.querySelector('.title-overlay');
  overlayTitle.innerHTML = videoConfig[playlistValue].title;
  if(videoState === "playing") {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
  } else if(videoState === "paused") {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
  if(!video.muted) {
    innerVolumeBar.style.width = storedVolume * 100 + '%';
  } else {
    innerVolumeBar.style.width = 0;
  }
}

const formatTime = (time) => {
  console.log(playlistValue);
  let timeRound = Math.round(time);
  let currentMinutes = Math.round(timeRound / 60);
  let currentSeconds =  timeRound % 60;

  if(currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  } else {
    currentMinutes = currentMinutes;
  }

  if(currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  } else {
    currentSeconds = currentSeconds;
  }

  return `${currentMinutes}:${currentSeconds}`;
}

const upnext = () => {
  const titleDisplay = document.querySelector('.up-next-title');
  const countdown = document.querySelector('.up-next-countdown');
  const thumbnail = document.querySelector('.up-next-thumbnail');
  const upNextThreshold = 50;
  const currentTime = video.currentTime;
  const duration = video.duration;
  let nextArray;
  remainingTime = duration - currentTime;
  if(playlistValue < videoConfig.length - 1) {
    nextArray = parseInt(playlistValue) + 1;
  } else {
    nextArray = 0;
  }
  if(remainingTime < upNextThreshold) {
    upNextOverlay.style.display = ("flex");
    titleDisplay.innerHTML = `Up next ${videoConfig[nextArray].title}`;
    thumbnail.setAttribute('src', videoConfig[nextArray].thumb);
    countdown.innerHTML = `${Math.round(remainingTime)} seconds`;
  }else {
    upNextOverlay.style.display = ("none");
  }
}

const checkEnded = () => {
  if(remainingTime === 0) {
    if(videoState != "ended" && videoState != "loading" && videoState != "playing") {
      videoState = "ended";
    }else {
      videoState = "loading";
    }
  }
}

const changeVideo = () => {
  console.log('###: playlistvalue', playlistValue);
  source.setAttribute('src', videoConfig[playlistValue].url);
  video.load();
  video.play();
}