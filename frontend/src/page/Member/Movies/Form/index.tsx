import './styles.css';
import MovieCard from 'components/MovieCard';


const Form = () =>{

    return(
        <div className="movie-detalhe-container">
            <div className="movie-select-container">
                <h1>Select</h1>
            </div>
            
            <div className="row">
                <div className="col-sm-6 col-lg-6 col-xl-3">
                    <MovieCard />
                </div>
                <div className="col-sm-6 col-lg-6 col-xl-3">
                    <MovieCard />
                </div>
                <div className="col-sm-6 col-lg-6 col-xl-3">
                    <MovieCard />
                </div>
                <div className="col-sm-6 col-lg-6 col-xl-3">
                    <MovieCard />
                </div>
            </div>
            
        </div>
    );
};

export default Form;