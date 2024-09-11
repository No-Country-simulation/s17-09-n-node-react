import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';   


function SocialMediaSection() {
  const handleSocialMediaClick = (url: string) => {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    <div className="social-media-section">
      <button onClick={() => handleSocialMediaClick('enlace_a_facebook')}>
        <FontAwesomeIcon icon={faFacebook} />
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_instagram')}>
        <FontAwesomeIcon icon={faInstagram} />
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_x')}> {/* 'X' anteriormente conocido como Twitter */}
        <FontAwesomeIcon icon={faTwitter} /> 
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_whatsapp')}>
        <FontAwesomeIcon icon={faWhatsapp} />
      </button>
    </div>
  );
}

export default SocialMediaSection;