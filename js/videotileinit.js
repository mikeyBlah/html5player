const tileContainer = document.querySelector('.video-tile-container');

const createTiles = () => {
  for(let i = 0; i < videoConfig.length; i++) {
    let newTile = document.createElement('div');
    let tileTitle = document.createElement('p');
    tileTitle.innerHTML = videoConfig[i].title;
    newTile.classList.add('video-tile');
    newTile.setAttribute('tileId', i);
    newTile.addEventListener("click", updatePlayArray);
    newTile.append(tileTitle);
    tileContainer.append(newTile);
  }
  setInterval(updateHandler, 500);
}

const updatePlayArray = (evt) => {
  playlistValue = evt.currentTarget.getAttribute('tileId');
  changeVideo();
}

