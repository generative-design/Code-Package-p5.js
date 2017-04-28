function createGUI() {
  gui = QuickSettings.create(10, 10, 'P_supercut_1');
  gui.addFileChooser('video', 'video file', 'video/*', selectVideoFile);
  gui.addFileChooser('subtitles', 'subtitle file', undefined, selectSubtitleFile);
  gui.addText('searchQuery', searchQuery, setSearchQuery);
  gui.addButton('generateMontage', generateMontage);
  gui.addHTML('output', '');
  gui.addButton('togglePlayback', togglePlayback);
}

function updateGUI() {
  gui.setValue('output', '<pre>' + currentResult.startTimeStamp + '</pre>' + currentResult.dialog);
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
