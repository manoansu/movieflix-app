import './styles.css';
import { Redirect } from 'react-router';
import {  hasAnyRole } from 'util/auth';
import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/request';
import { Movie } from 'types/movie';
import MovieFormCard from 'page/MovieFormCard';

type UrlParams = {
    movieId: string;
}

const MovieDatails = () => {
    
    const { movieId } = useParams<UrlParams>();
    
    const [movie, setMovie] = useState<Movie>();

    const getListReview = useCallback(() =>{

        const config : AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movieId}`,
            withCredentials:true  
        }
       
        requestBackend(config)
            .then(response => {
                setMovie(response.data);
            })
    },[movieId])

    // Faz a requisição 1ª vez
    useEffect(() =>{
     getListReview();
     
    },[getListReview]);

    return(
        <div className="movie-details-container">
            
            {hasAnyRole(['ROLE_MEMBER']) ? (
                    <div className="movie-details" >
                        <MovieFormCard movie={movie} onList={getListReview}/>
                    </div>
            ) : (
                <Redirect to="/movies/:movieId" />
            )}
        </div>
    );
};

export default MovieDatails;