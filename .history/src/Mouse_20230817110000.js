import React, { useState, useEffect } from 'react';
import './MouseCircle.css'; // Create this CSS file for styling

const MouseCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  const MAX_TRAIL_LENGTH = 10;

  useEffect(() => {
    const updateTrail = () => {
      setTrail([...trail, position].slice(-MAX_TRAIL_LENGTH));
      requestAnimationFrame(updateTrail);
    };

    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
    };

    requestAnimationFrame(updateTrail);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position, trail]);

  return (
    <div className="mouse-circle-container">
      <div className="mouse-trail">
        {trail.map((trailPosition, index) => (
          <div
            key={index}
            className="trail-dot"
            style={{
              left: trailPosition.x,
              top: trailPosition.y,
              animationDelay: `${index * 20}ms`,
            }}
          />
        ))}
      </div>
      <div
        className="mouse-circle"
        style={{ left: position.x, top: position.y }}
      />
    </div>
  );
};

export default MouseCircle;
