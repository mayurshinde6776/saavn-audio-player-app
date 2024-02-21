
import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ song }) => {
  return (
    <BootstrapCard style={{ width: '15rem' }}>
      <BootstrapCard.Img variant="top" src={song.coverImageDataUrl} alt={`Cover for ${song.title}`} style={{ height: '16rem', objectFit: 'cover' }} />
      <BootstrapCard.Body>
        <BootstrapCard.Title>{song.title}</BootstrapCard.Title>
        <BootstrapCard.Text>{`Singer: ${song.singer}`}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
