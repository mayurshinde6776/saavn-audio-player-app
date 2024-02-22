// NowPlaying.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPause } from '@fortawesome/free-solid-svg-icons';
import AudioService from '../services/AudioService';

const NowPlaying = () => {
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const handleAudioChange = () => {
      setSelectedSong(AudioService.getCurrentSong());
    };

    // Add event listeners to handle changes in the audio service
    AudioService.addChangeListener(handleAudioChange);

    // Fetch the current song information from AudioService
    setSelectedSong(AudioService.getCurrentSong());

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

  return (
    <div className="fixed-bottom">
      <Card className="text-center">
        <Row className="no-gutters m-3">
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
            <Card.Body>
              <div className="d-flex justify-content-center mx-3">
                <Button variant="light" className="mx-2" onClick={handlePrevious}>
                  <FontAwesomeIcon icon={faStepBackward} style={{ backgroundColor: 'none', fontSize: '30px' }} />
                </Button>
                <Button variant="light" className="mx-2" onClick={handlePause}>
                  <FontAwesomeIcon icon={faPause} style={{ backgroundColor: 'none', fontSize: '30px' }} />
                </Button>
                <Button variant="light" className="mx-2" onClick={handleNext}>
                  <FontAwesomeIcon icon={faStepForward} style={{ backgroundColor: 'none', fontSize: '30px' }} />
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NowPlaying;