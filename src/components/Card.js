// Card.js
import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ song, onSelect }) => {
  return (
    <BootstrapCard style={{  border: 'none', cursor: 'pointer' }} onClick={onSelect}>
      <BootstrapCard.Img
        variant="top"
        src={song.coverImageDataUrl}
        alt={`Cover for ${song.title}`}
        style={{ height: '10rem' }}
      />
      <BootstrapCard.Body>
        <BootstrapCard.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textAlign:'center' }}>
          {song.title}
        </BootstrapCard.Title>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
