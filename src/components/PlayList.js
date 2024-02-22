// PlayList.js
import React, { useEffect } from 'react';
import Card from './Card';
import AudioService from '../services/AudioService';
import { Container, Row, Col } from 'react-bootstrap';

const PlayList = () => {
  const [songs, setSongs] = React.useState([]);
  const [selectedSong, setSelectedSong] = React.useState(null);

  useEffect(() => {
    // Retrieve songs from localStorage
    const storedSongs = JSON.parse(localStorage.getItem('uploadedAudioFiles')) || [];
    setSongs(storedSongs);

    // Set the playlist in the AudioService
    AudioService.setPlaylist(storedSongs);
  }, []);

  useEffect(() => {
    // Add an event listener for beforeunload to save the state
    const handleBeforeUnload = () => {
      AudioService.saveState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    AudioService.playAudio(song);
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

    
    </Container>
  );
};

export default PlayList;
