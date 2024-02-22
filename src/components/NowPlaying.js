import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import AudioService from '../services/AudioService';

const NowPlaying = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const handleAudioChange = () => {
      setSelectedSong(AudioService.getCurrentSong());
      setIsPaused(AudioService.isPaused);
    };

    // Add event listeners to handle changes in the audio service
    AudioService.addChangeListener(handleAudioChange);

    // Fetch the current song information from AudioService
    setSelectedSong(AudioService.getCurrentSong());
    setIsPaused(AudioService.isPaused);

    // Load the state, including the current song, from local storage
    AudioService.loadState();

    return () => {
      // Remove the event listener when the component is unmounted
      AudioService.removeChangeListener(handleAudioChange);
    };
  }, []);

  const handleNext = () => {
    AudioService.playNext();
  };

  const handlePause = () => {
    AudioService.togglePause();
  };

  const handlePrevious = () => {
    AudioService.playPrevious();
  };

  // Conditionally render the component only when there is a currently playing song
  if (!selectedSong) {
    return null;
  }

  return (
    <div className="fixed-bottom">
      <Card className="text-center" style={{ border: '2px solid #2BC5B4' }}>
        <Row className="no-gutters">
          <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
            <Card.Img src={selectedSong ? selectedSong.coverImageDataUrl : ''} alt={selectedSong ? `Cover for ${selectedSong.title}` : ''} style={{ height: '60px', width: '60px' }} />
          </Col>
          <Col xs={12} md={4} className="d-flex flex-column align-items-center">
            <Card.Body>
              <Card.Title>{selectedSong ? selectedSong.title : ''}</Card.Title>
              <Card.Text>{selectedSong ? selectedSong.singer : ''}</Card.Text>
            </Card.Body>
          </Col>
          <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
            <div className="d-flex justify-content-center mx-3">
              <Button variant="light" className="mx-2" onClick={handlePrevious}>
                <FontAwesomeIcon icon={faStepBackward} style={{ backgroundColor: 'none', fontSize: '30px' }} />
              </Button>
              <Button variant="light" className="mx-2" onClick={handlePause}>
                <FontAwesomeIcon icon={isPaused ? faPlay : faPause} style={{ backgroundColor: 'none', fontSize: '30px' }} />
              </Button>
              <Button variant="light" className="mx-2" onClick={handleNext}>
                <FontAwesomeIcon icon={faStepForward} style={{ backgroundColor: 'none', fontSize: '30px' }} />
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NowPlaying;
