import './CSS/Card.css';
import { Typography, Paper, CardMedia, Chip,Stack , Link, IconButton} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const CardComponent = ({type}) => {

    const renderChips = () => {
    }

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

    const renderOptions = () => {

        switch (type) {
            case 'digital':
                return (
                    <IconButton aria-label='Favorite' color='primary' sx={{'&:focus': {outline: 'none'},}} >
                        <MoreVertIcon fontSize='large'/>
                    </IconButton>
                );
            case 'physical':
                return (
                    <IconButton aria-label='Favorite' color='primary' sx={{'&:focus': {outline: 'none'},}} >
                        <MoreVertIcon fontSize='large'/>
                    </IconButton>
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
    <Paper elevation={3}>
        <div className="cardContainer">
            <div className='cardImage'>
                <CardMedia
                    sx={{ width: 65, height: 92, boxShadow: 6}}
                    component="img"
                    image="https://picsum.photos/65/92"
                    alt="random"
                />
            </div>
            <div className='cardContent'>
                <Typography sx={{fontFamily:'Arial', fontSize:20, fontWeight:'bold',textAlign:'left'}}>
                Revista de Ciencia y Tecnologia
                </Typography>
                <Typography sx={{lineHeight:1.5, fontSize: 15}} align='left' >Universidad Nacional de Innovacion Tecnologica</Typography>
                <Typography sx={{lineHeight:1.5, fontSize: 15}} align='left'>Vol 2. Ed 1.</Typography>
                <Typography sx={{lineHeight:1.5, fontSize: 15}} align='left'>ISSN 2345-6789</Typography>
                <Stack direction="row" spacing={1}>
                    <Chip sx={{height:15}}color='primary' label="History" size='small'/>
                    <Chip sx={{height:15}}color='primary' label="History" size='small'/>
                    <Chip sx={{height:15}}color='primary' label="History" size='small'/>
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

export default CardComponent;