// Import thư viện
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

// Import hình ảnh và SVG
import particles from '../../assets/404/particles.png';
import PlanetSvg from '../../assets/404/planet.svg';
import AstronautSvg from '../../assets/404/astronaut.svg';

function NotFound() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      bgcolor: '#25344C',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${particles})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center'
    }}>
      <Typography variant="h1" sx={{ fontSize: '100px', fontWeight: 800 }}>404</Typography>
      <Typography sx={{ fontSize: '18px', lineHeight: '25px', fontWeight: 400, maxWidth: '350px', textAlign: 'center' }}>
        LOST IN&nbsp;
        <Typography component="span" sx={{
          position: 'relative',
          '&:after': {
            position: 'absolute',
            content: '""',
            borderBottom: '3px solid #fdba26',
            left: 0,
            top: '43%',
            width: '100%'
          }
        }}>
          &nbsp;SPACE&nbsp;
        </Typography>
        &nbsp;<Typography component="span" sx={{ color: '#fdba26', fontWeight: 500 }}>Quocloc</Typography>?<br />
        Hmm, looks like that page doesn&apos;t exist.
      </Typography>
      <Box sx={{ width: '390px', height: '390px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img src={AstronautSvg} alt="Astronaut" style={{ width: '80px', position: 'absolute', top: '20px', right: '25px' }} />
        <img src={PlanetSvg} alt="Planet" style={{ width: '250px' }} />
      </Box>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { color: '#fdba26', borderColor: '#fdba26' }
          }}
        >Go Home</Button>
      </Link>
    </Box>
  );
}

export default NotFound;