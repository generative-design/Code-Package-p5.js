function createGUI() {
  gui = QuickSettings.create(10, 10, 'P_supercut_3');
  gui.addFileChooser('video', 'video file', 'video/*', selectVideoFile);
  gui.addFileChooser('subtitles', 'subtitle file', undefined, selectSubtitleFile);
  gui.addText('searchQuery', searchQuery, setSearchQuery);
  gui.addButton('generateMontage', generateMontage);
  gui.addProgressBar('searchResults', searchResults.length, 0, 'numbers');
  gui.addProgressBar('video time', video.duration(), video.time(), 'numbers');
  gui.addHTML('time', '00:00:00');
  gui.addHTML('dialog', '');
  gui.addButton('togglePlayback', togglePlayback);

  video.elt.ontimeupdate = updateGUI;
}

function updateGUI() {
  gui.setProgressMax('searchResults', searchResults.length);
  gui.setValue('searchResults', searchResults.indexOf(currentResult) + 1);
  gui.setProgressMax('video time', round(video.duration()));
  gui.setValue('video time', round(video.time()));
  subtitles.forEach(function(subtitle) {
    if (video.time() > subtitle.startTime && video.time() < subtitle.endTime) {
      gui.setValue('time', '<code>' + subtitle.startTimeStamp + '</code>');
      gui.setValue('dialog', '<code>' + subtitle.dialog + '</code>');
    }
  });
}

function setSearchQuery(newSearchQuery) {
  searchQuery = newSearchQuery;
}

function selectVideoFile(file) {
  videoSrc = URL.createObjectURL(file);
  reset();
}

function selectSubtitleFile(file) {
  subtitleSrc = URL.createObjectURL(file);
  reset();
}

function reset() {
  gui.destroy();
  remove();
  new p5;
}
