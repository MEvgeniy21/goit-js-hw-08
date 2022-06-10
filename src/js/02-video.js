import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const persistedVideoTime = localStorage.getItem(LOCALSTORAGE_KEY);

const iframe = document.querySelector('iframe');
const webPlayer = new Player(iframe);

if (persistedVideoTime) {
  setVideoTimeFromLS(JSON.parse(persistedVideoTime));
}

webPlayer.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  saveVideoTimeToLS(data.seconds);
}

function saveVideoTimeToLS(time) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(time));
}

function setVideoTimeFromLS(time) {
  webPlayer.setCurrentTime(time);
}
