import './styles.css';
import { Redirect } from 'react-router';
import {  hasAnyRole } from 'util/auth';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/request';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { Link } from 'react-router-dom';
import MovieCard from 'components/MovieCard';


type UrlParams = {
    movieId: string;
}

const MovieDatails = () => {
    
    const { movieId } = useParams<UrlParams>();

    // Declara o estado do componente usando o useState.
    const [page, setPage] = useState<SpringPage<Movie>>();
       
    // Faz a requisição 1ª vez
    useEffect(() =>{
        
        const config : AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/`,
            withCredentials:true  
        }
       
        requestBackend(config)
            .then(response => {
                setPage(response.data);
                console.log('Data »»»»» ' + response.data);
            })

    },[movieId]);


    return(
        <div className="movie-details-container">
            {hasAnyRole(['ROLE_MEMBER']) ? (
                page?.content.map(obj => (
                    <div key={obj.id} className="movie-details" >
                        <Link to="/movies/1">
                            <MovieCard movie={obj} />
                        </Link>
                    </div>
                ))  

            ) : (
                <Redirect to="/movies/:movieId" />
            )}
        </div>
    );
};

export default MovieDatails;