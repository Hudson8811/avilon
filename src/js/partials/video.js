window.addEventListener('load', () => {
  const videoEl = document.querySelector('.video');

  if (videoEl) {
    const videoTag = videoEl.querySelector('video');
    const videoPlayBtn = videoEl.querySelector('.video__play');
    const videoPlaceholder = videoEl.querySelector('.video__placeholder');

    const onVideoClick = (e) => {
      videoTag.onclick = null;
      videoTag.pause();
      videoPlaceholder.classList.remove('hidden');
    };

    const onVideoPlayBtnClick = (e) => {
      videoTag.onclick = onVideoClick;
      videoPlaceholder.classList.add('hidden');

      videoTag.play();
    };

    videoPlayBtn.onclick = onVideoPlayBtnClick;
  }
});