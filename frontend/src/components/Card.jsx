import './CSS/Card.css';
import { Typography, Paper, CardMedia, Chip,Stack , Link, IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuOptions from './MenuOptions';
import { useNavigate } from 'react-router-dom';


const CardComponent = ({type = 'digital', image,title, text1, text2, text3, categories, id}) => {

    const typeCard = window.location.href.split('/').pop();

    const navigate = useNavigate();

    const handleRedirect = (id) => {
        navigate(`/inventory/${typeCard}/detail/${id}`);  
    };

    //Para renderizar las categorias
    const renderChips = () => {
        return categories.map((category, index) => {
            return <Chip key={`${id}_${index}`} sx={{height:15}}color='primary' label={category} size='small'/>
        });
    }

    //Para renderizar la info adicional en caso de que sea libro (Copias, seccion, estante) o en caso de que sea cliente (Reservar)
    const renderAdditional = () => {
    
        switch (type) {
            
            case 'physical':
                return (
                    <>
                        <Typography sx={{lineHeight:1.4, fontSize: 18, fontWeight:'bold'}} align='left'>Copies: {4}</Typography>
                        <Typography sx={{lineHeight:1.4, fontSize: 15}} align='left'>Section: {'A32'}</Typography>
                        <Typography sx={{lineHeight:1.4, fontSize: 15}} align='left'>Bookshelf: {3564}</Typography>
                    </>
                );
            case 'client':
                return (
                    <Link sx={{fontSize:18, fontWeight:'bold'}} href="#">Reserve</Link>
                )
            default:
                return;
        }
    }

    //Para renderozar las opciones en caso de que sea digital (Descargar, Compartir) o en caso de que sea fisico (Mas opciones)
    const renderOptions = () => {

        switch (type) {
            case 'digital':
                return (
                    <IconButton aria-label='Favorite' color='primary' disableFocusRipple style={{ outline: 'none' }} >
                        <MoreVertIcon fontSize='large'/>
                    </IconButton>
                );
            case 'physical':
                return (
                <MenuOptions
                 iconButton={
                 <IconButton aria-label='Options' color='primary' disableFocusRipple style={{ outline: 'none' }}>
                    <MoreVertIcon />
                    </IconButton>
                    }
                    options={[
                        { label: 'Copies', onClick: () => navigate("/copies") },
                        { label: 'Edit', onClick: () => navigate("/edit") },
                        { label: 'Delete', onClick: () => navigate("/delete") },
  ]}
/>
                );
            case 'client':
                return (
                    <IconButton>
                        <FavoriteBorderIcon/>
                    </IconButton>
                )
            default:
                return;
        }
        
    }


    return (
    <Paper elevation={3} sx={{'&:hover': { backgroundColor: 'rgba(234, 234, 234, 0.83)'}}}>
        <div className="cardContainer" onClick={() => handleRedirect(id)}>
            <div className='cardImage'>
                <CardMedia
                    sx={{ width: 65, height: 92, boxShadow: 6}}
                    component="img"
                    image={image}
                    alt="random"
                />
            </div>
            <div className='cardContent'>
                <Typography sx={{fontFamily:'Arial', fontSize:20, fontWeight:'bold',textAlign:'left'}}>{title}</Typography>
                <Typography sx={{lineHeight:1.5, fontSize: 15}} align='left' >{text1}</Typography>
                <Typography sx={{lineHeight:1.5, fontSize: 15}} align='left'>{text2}</Typography>
                <Typography sx={{lineHeight:1.5, fontSize: 15}} align='left'>{text3}</Typography>
                <Stack direction="row" spacing={1}>
                    {renderChips()}
                </Stack>
            </div>
            <div className='cardOptions'>
                {renderOptions()}
            </div>
            <div className='cardAdditional'>
                {renderAdditional()}
            </div>
        </div>
    </Paper>  
    );
}

//Componente de prueba

{/* <CardComponent 
      type='client' 
      image='https://picsum.photos/65/92'
      title='Revista de Ciencia y Tecnologia' 
      text1='Universidad Nacional de Innovacion Tecnologica' 
      text2='Vol 2 Ed.1' 
      text3='ISSN 5464 3434' 
      categories={['History', 'Technology', 'Science']}/> */}

export default CardComponent;