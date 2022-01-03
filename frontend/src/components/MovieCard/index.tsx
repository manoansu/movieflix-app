import './styles.css';
import StarIcon from '../../assets/images/star.png';
import { Movie } from 'types/movie';
import ButtonSave from 'components/ButonSave';
import { Review } from 'types/review';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/request';
import { AxiosRequestConfig } from 'axios';


type Props ={
    movie: Movie;
}

const MovieCard = ({ movie } : Props) =>{

    const [review, setReview] = useState<Review>();


    useEffect(() => {
        const config : AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movie.id}/reviews`,
            withCredentials:true  
        }
       

        requestBackend(config)
        .then(response => {
            setReview(response.data.content)
        })
    }, [movie.id])

    console.log('Id: ==== ' + movie?.id);
    console.log('img: ==== ' + movie?.imgUrl);
    console.log('subtitle: ==== ' + movie?.subTitle);
    console.log('list: ==== ' + movie.reviews);
    console.log('Synopsis: ==== ' + movie?.synopsis);
    console.log('Year: ==== ' + movie?.year);

    return(
        <div className="movie-details-container">
            <div className="base-card movie-details-card">
                <div className="movie-title">
                    <h1>Tela detalhes do filme id: {movie.id}</h1>
                </div>
                <form >
                    <div className="mb-4 input-container">
                        <input
                            type="text"
                            className="form-control base-input" placeholder="Deixe sua avaliação aqui"
                            name="username"  />
                        <div className="btn-salvar-avaliacao">
                            <ButtonSave text="SALVAR AVALIAÇÃO"/>
                        </div>
                    </div>

                    <div className="row-container">
                        
                        {movie.reviews.map(obj => (
                        <div key={obj.id} className="col-xl-6 review" >                       
                            <>
                            <div className="review-name">
                                <img src={StarIcon} alt="Star" />  
                                <h1>{obj?.user}</h1>
                            </div>
                            <div className="review-container">
                                <h2>{obj?.text}</h2>
                            </div>               
                            </>
                            
                        </div>
                     ))}
                       
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieCard;