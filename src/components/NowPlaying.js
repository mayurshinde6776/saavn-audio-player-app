// NowPlaying.js
import React from 'react';

const NowPlaying = ({ currentFile }) => {
  return (
    <div>
      {currentFile && <p>Now Playing: {currentFile.name}</p>}
    </div>
  );
};

export default NowPlaying;
