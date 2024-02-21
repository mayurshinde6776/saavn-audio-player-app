
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Container, Row, Col } from 'react-bootstrap';

const PlayList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Retrieve songs from localStorage
    const storedSongs = JSON.parse(localStorage.getItem('uploadedAudioFiles')) || [];
    setSongs(storedSongs);
  }, []);

  return (
    <Container>
      <section>
        <h2>Welcome to Your Audio Player App</h2>
        <p>Upload and play your favorite audio files.</p>
      </section>

      <section>
        <Row>
          {songs.map((song, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card song={song} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default PlayList;
