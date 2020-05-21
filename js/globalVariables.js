// CONSTANTS ---
const video = document.createElement("video");
const source = document.createElement("source");
const videoConfig = [
  { 
    description: "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    subtitle: "By Blender Foundation",
    thumb: "https://images.unsplash.com/photo-1588083066783-8828e623bad7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=300",
    title: "Big Buck Bunny"
  },
  { 
    description: "The first Blender Open Movie from 2006",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    subtitle: "By Blender Foundation",
    thumb: "https://images.unsplash.com/photo-1588083066783-8828e623bad7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=300",
    title: "Elephant Dream"
  },
  { description: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    subtitle: "By Google",
    thumb: "https://images.unsplash.com/photo-1588083066783-8828e623bad7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixlib=rb-1.2.1&q=80&w=300",
    title: "For Bigger Escape"
  },
]
// VARIABLES ---
let videoState = null;
let isMuted;
let overlay;
let playOverlay;
let fullScreenBtn;
let playPauseBtn;
let muteBtn;
let seekBar;
let volumeBar;
let innerVolumeBar;
let storedVolume = 1;
let timeWidget;
let seekMousePos;
let progressMarker;
let upNextOverlay;
let playlistValue = 0;
let remainingTime = null;
let upNext = true;