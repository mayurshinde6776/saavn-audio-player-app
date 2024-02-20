import React, { useState } from 'react';

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
    // Perform validation or additional checks if needed
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
  
    // Retrieve existing uploaded files from localStorage
    const existingFiles = JSON.parse(localStorage.getItem('uploadedAudioFiles')) || [];
  
    // Use Promise.all to handle multiple asynchronous FileReader operations for audio files
    const audioFilePromises = audioFiles.map((audioFile) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve({ audioDataUrl: event.target.result, title, singer });
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(audioFile);
      });
    });
  
    // Use Promise.all to handle asynchronous FileReader operation for the cover image
    const coverImagePromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve({ coverImageDataUrl: event.target.result });
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(coverImage);
    });
  
    Promise.all([coverImagePromise, ...audioFilePromises])
      .then((fileDataArray) => {
        // Extract cover image data from the first element of the array
        const coverImageData = fileDataArray.shift();
  
        // Concatenate the new files with the existing files
        const uploadedFiles = [...existingFiles, ...fileDataArray.map(({ audioDataUrl, title, singer }) => ({ audioDataUrl, title, singer, ...coverImageData }))];
  
        // Store the combined files in localStorage
        localStorage.setItem('uploadedAudioFiles', JSON.stringify(uploadedFiles));
        console.log('Files uploaded successfully:', uploadedFiles);
  
        // Clear the form fields after upload if needed
        setAudioFiles([]);
        setCoverImage(null);
        setTitle('');
        setSinger('');
      })
      .catch((error) => {
        console.error('Error reading file:', error);
      });
  };
  
  
  

  return (
    <div className="container mt-5" >
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Upload Your favorite Song</h2>
          <div style={{height:'800px', width:'500px'}}>
          <form>
            <div className={`mb-3 ${titleError ? 'has-error' : ''}`}>
              <label htmlFor="title" className="form-label">Song Title:</label>
              <input type="text" className="form-control" id="title" placeholder='song title'  value={title} onChange={handleTitleChange} />
              {titleError && <div className="error-message" style={{color:'red'}}>Please enter the song title</div>}
            </div>
            <div className={`mb-3 ${singerError ? 'has-error' : ''}`}>
              <label htmlFor="singer" className="form-label">Song Singer:</label>
              <input type="text" className="form-control" id="singer" placeholder="singer name" value={singer} onChange={handleSingerChange} />
              {singerError && <div className="error-message" style={{color:'red'}}>Please enter the singer of the song</div>}
            </div>
            <div className={`mb-3 ${audioFilesError ? 'has-error' : ''}`}>
              <label htmlFor="audioFiles" className="form-label">Choose Audio Files:</label>
              <input type="file" className="form-control" accept="audio/*" onChange={handleAudioFileChange} multiple />
              {audioFilesError && <div className="error-message" style={{color:'red'}}>Please upload the song</div>}
            </div>
            <div className={`mb-3 ${coverImageError ? 'has-error' : ''}`}>
              <label htmlFor="coverImage" className="form-label">Choose Cover Image:</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleCoverImageChange} />
              {coverImageError && <div className="error-message" style={{color:'red'}}>Please upload the cover image of the song</div>}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
