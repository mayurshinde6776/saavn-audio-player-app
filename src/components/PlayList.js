// PlayList.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import NowPlaying from './NowPlaying';
import { Container, Row, Col } from 'react-bootstrap';

const PlayList = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    // Retrieve songs from localStorage
    const storedSongs = JSON.parse(localStorage.getItem('uploadedAudioFiles')) || [];
    setSongs(storedSongs);
  }, []);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  return (
    <Container className='container-flex'>
      <section>
        <h2>Welcome to Your Audio Player App</h2>
        <p>Upload and play your favorite audio files.</p>
      </section>

      <section>
        <Row>
          {songs.map((song, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card song={song} onSelect={() => handleSongSelect(song)} />
            </Col>
          ))}
        </Row>
      </section>

      {selectedSong && (
        <div className='mb-5'>
          <NowPlaying selectedSong={selectedSong} />
        </div>
      )}
    </Container>
  );
};

export default PlayList;
