import './styles.css';
import FilmeIcon from '../../assets/images/filme.png';
import { Link } from 'react-router-dom';



const MovieCard = () =>{

    return(
        <div className='movie-separate-container'>
                <Link to="movies/1">
                <div className="movie-content-container">
                    
                        <div className="movie-image-container">
                            <img src={FilmeIcon} alt="filme" />
                        </div>
                    
                    <div className="movie-title-container">
                        <h2>O Retorno do Rei</h2>
                    </div>
                    <div className="movie-year-container">
                        <h4>2013</h4>
                    </div>
                    <div className="movie-legenda-container">
                        <h6>O olho do inimigo está se movendo.</h6>
                    </div>          
                </div>
                </Link> 
        </div>
    );
};

export default MovieCard;