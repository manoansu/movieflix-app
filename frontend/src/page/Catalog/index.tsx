import './styles.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { SpringPage } from '../../types/vendor/spring';
import { requestBackend } from '../../util/request';

import { Movie } from 'types/movie';


const Catalog = () => {

    //{{host}}/products?page=0&size=12
    // Declara o estado do componente usando o useState.
    const [page, setPage] = useState<SpringPage<Movie>>();
       
    // Faz a requisição 1ª vez
    useEffect(() =>{
        
        const config : AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/`,  
        }
       
        requestBackend(config)
            .then(response =>{
                setPage(response.data);
            })
    },[]);
    
    return(
        <div className="container my-4 catalog-container">
            <div className="row catalog-title-container">
            </div>
            <div className="row">
                { page?.content.map(obj => (
                        <div className="test" key={obj.id}>
                            <Link to="/movies/1">
                                
                            </Link>
                        </div>
                    ))}   
            </div>
        </div>
    );
};

export default Catalog;