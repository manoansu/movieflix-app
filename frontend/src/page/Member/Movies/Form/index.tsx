import './styles.css';
import FilmeIcon from '../../../../assets/images/filme.png';


const Form = () =>{

    return(
        <div className="movie-detalhe-container">
            <div className="movie-select-container">
                <h1>Select</h1>
            </div>
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
        </div>
    );
};

export default Form;