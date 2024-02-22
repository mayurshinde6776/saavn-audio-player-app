import React, { useState, useEffect } from 'react';
import Card from './Card';
import NowPlaying from './NowPlaying'; // Import the NowPlaying component
import AudioService from '../services/AudioService';
import { Container, Row, Col } from 'react-bootstrap';

const PlayList = () => {
  const [songs, setSongs] = React.useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // New state to track the selected card

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
    AudioService.playAudio(song, true); // Pass true to indicate played by card
    setSelectedCard(song); // Set the selected card
  };

  return (
    <Container className='container '>
      <div className='text-center mx-auto my-4'>
        <h2>Welcome to Saavn Audio Player</h2>
        <p>Upload and play your favorite songs.</p>
      </div>
      <div className='mx-auto'>
        <Row xs={1} sm={2} md={3} lg={4}>
          {songs.map((song, index) => (
            <Col key={index}>
              <Card song={song} onSelect={() => handleSongSelect(song)} />
            </Col>
          ))}
        </Row>
      </div>
      <div>
      <NowPlaying  selectedCard={selectedCard} />
      </div>
    </Container>
  );
};

export default PlayList;
