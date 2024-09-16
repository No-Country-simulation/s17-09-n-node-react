
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';  // 'X' anteriormente conocido como Twitter
import WhatsAppIcon from '@mui/icons-material/WhatsApp';



function SocialMediaSection() {
  const handleSocialMediaClick = (url: string) => {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    <div className="social-media-section">
      <button onClick={() => handleSocialMediaClick('enlace_a_facebook')} title='facebook'>
        <FacebookIcon /> 
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_instagram')} title='instagram'>
        <InstagramIcon /> 
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_x')}> {/* 'X' anteriormente conocido como Twitter */}
        <TwitterIcon />  
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_whatsapp')}title='Whatsapp'>
        <WhatsAppIcon /> 
      </button>
    </div>
  );
}

export default SocialMediaSection;