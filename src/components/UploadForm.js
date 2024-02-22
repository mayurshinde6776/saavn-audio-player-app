import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

const UploadForm = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');

  // State to track whether each input field is empty
  const [titleError, setTitleError] = useState(false);
  const [singerError, setSingerError] = useState(false);
  const [audioFilesError, setAudioFilesError] = useState(false);
  const [coverImageError, setCoverImageError] = useState(false);

  const handleAudioFileChange = (e) => {
    setAudioFiles([...audioFiles, ...e.target.files]);
    setAudioFilesError(false);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
    setCoverImageError(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleSingerChange = (e) => {
    setSinger(e.target.value);
    setSingerError(false);
  };

  const handleUpload = () => {
    let hasError = false;

    // Check if title is empty
    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    }

    // Check if singer is empty
    if (singer.trim() === '') {
      setSingerError(true);
      hasError = true;
    }

    // Check if audioFiles is empty
    if (audioFiles.length === 0) {
      setAudioFilesError(true);
      hasError = true;
    }

    // Check if coverImage is empty
    if (!coverImage) {
      setCoverImageError(true);
      hasError = true;
    }

    // If there is an error, stop the upload
    if (hasError) {
      console.error('Please fill in all fields and select at least one audio file and a cover image');
      return;
    }

    // Rest of your upload logic...
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Upload Your Favorite Song</h2>
          <Form>
            <Form.Group className={`mb-3 ${titleError ? 'has-error' : ''}`}>
              <Form.Label>Song Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter song title" value={title} onChange={handleTitleChange} />
              {titleError && <Form.Text className="error-message" style={{ color: 'red' }}>Please enter the song title</Form.Text>}
            </Form.Group>
            <Form.Group className={`mb-3 ${singerError ? 'has-error' : ''}`}>
              <Form.Label>Song Singer:</Form.Label>
              <Form.Control type="text" placeholder="Enter singer name" value={singer} onChange={handleSingerChange} />
              {singerError && <Form.Text className="error-message" style={{ color: 'red' }}>Please enter the singer of the song</Form.Text>}
            </Form.Group>
            <Form.Group className={`mb-3 ${audioFilesError ? 'has-error' : ''}`}>
              <Form.Label>Choose Audio Files:</Form.Label>
              <Form.Control type="file" accept="audio/*" onChange={handleAudioFileChange} multiple />
              {audioFilesError && <Form.Text className="error-message" style={{ color: 'red' }}>Please upload the song</Form.Text>}
            </Form.Group>
            <Form.Group className={`mb-3 ${coverImageError ? 'has-error' : ''}`}>
              <Form.Label>Choose Cover Image:</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleCoverImageChange} />
              {coverImageError && <Form.Text className="error-message" style={{ color: 'red' }}>Please upload the cover image of the song</Form.Text>}
            </Form.Group>
            <Button  type="button" style={{ backgroundColor: '#2BC5B4', color: 'white' }} onClick={handleUpload}>Upload</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;
