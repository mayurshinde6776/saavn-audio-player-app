// NowPlaying.js
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStepBackward, faStepForward, faPause } from '@fortawesome/free-solid-svg-icons';

const NowPlaying = ({ selectedSong }) => {
  return (
    <div className="fixed-bottom">
      <Card className="text-center">
        <Row className="no-gutters m-3">
          <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
            <Card.Img src={selectedSong.coverImageDataUrl} alt={`Cover for ${selectedSong.title}`} style={{ height: '70px', width: '70px' }} />
          </Col>
          <Col xs={12} md={4} className="d-flex flex-column align-items-center">
            <Card.Body>
              <Card.Title>{selectedSong.title}</Card.Title>
              <Card.Text>{selectedSong.singer}</Card.Text>
            </Card.Body>
          </Col>
          <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
            <Card.Body>
              <div className="d-flex justify-content-center mx-3">
                <Button variant="light" className="mx-2">
                  <FontAwesomeIcon icon={faStepBackward} style={{ backgroundColor: 'none', fontSize: '30px' }} />
                </Button>
                <Button variant="light" className="mx-2">
                  <FontAwesomeIcon icon={faPause} style={{ backgroundColor: 'none', fontSize: '30px' }} />
                </Button>
                <Button variant="light" className="mx-2">
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
