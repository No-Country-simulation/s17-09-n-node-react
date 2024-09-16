
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';  // 'X' anteriormente conocido como Twitter
import WhatsAppIcon from '@mui/icons-material/WhatsApp';



function SocialMediaSection() {
  const handleSocialMediaClick = (url: string) => {
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    <div className="social-media-section flex justify-center">
      <button onClick={() => handleSocialMediaClick('enlace_a_facebook')} title='facebook'className="text-2xl px-10 py-2 mx-4">
        <FacebookIcon /> 
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_instagram')} title='instagram'className="text-2xl px-10 py-2 mx-4">
        <InstagramIcon /> 
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_x')}title='X'className="text-2xl px-10 py-2 mx-4"> 
        <TwitterIcon />  
      </button>
      <button onClick={() => handleSocialMediaClick('enlace_a_whatsapp')}title='Whatsapp' className="text-2xl px-10 py-2 mx-4 ">
        <WhatsAppIcon /> 
      </button>
    </div>
  );
}

export default SocialMediaSection;