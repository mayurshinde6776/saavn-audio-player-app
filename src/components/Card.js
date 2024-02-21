// Card.js
import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ song, onSelect }) => {
  return (
    <BootstrapCard style={{ width: '15rem',border:'none' }} onClick={onSelect}>
      <BootstrapCard.Img
        variant="top"
        src={song.coverImageDataUrl}
        alt={`Cover for ${song.title}`}
        style={{ height: '10rem'}}
      />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{song.title}</BootstrapCard.Title>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
