import { AxiosRequestConfig } from 'axios';
import StarIcon from '../../assets/images/star.png';
import ButtonSave from 'components/ButonSave';
import { Movie } from 'types/movie';
import { requestBackend } from 'util/request';
import './styles.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FilmeIcon from '../../assets/images/filme.png';

export type ReviewFormData = {
    text: string;
    movieId:number;
}

type Props ={
    movie?: Movie;
    onList: Function;            
}

const MovieFormCard = ( {movie, onList} : Props) =>{

    const {register, handleSubmit, setValue, formState: {errors} } = useForm<ReviewFormData>();

    
    const onSubmit = (formData: ReviewFormData) =>{
               
        const data = {...formData, text:formData.text, movieId:movie?.id}
        const config : AxiosRequestConfig = {
            method: 'POST',
            url: '/reviews',
            data,
            withCredentials:true  
        }

        requestBackend(config)
        .then(() => {
            toast.info('Avaliação cadastrado com sucesso!');
        }).catch(() =>{
            toast.error('Erro ao cadastrar avaliação.');
        })
        handleFormClear();
        getListReview();
    };
    
     //apenas limpa o formulario na tela quando sava os dados
     const handleFormClear = () =>{
        setValue('text', '');
    }

    const getListReview = () =>{

        const config : AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movie?.id}`,
            withCredentials:true  
        }
       
        requestBackend(config)
            .then(response => {
                onList();
            })
    };

    return(
        <div className="movie-form-container">
            <div className="movie-formcard-content-container">
                    
                    <div className="movie-formcard-image-container">
                        <img src={FilmeIcon} alt="filme" />
                    </div>
                
                <div className="movie-formcard-title-container">
                    <h2>O Retorno do Rei</h2>
                </div>
                <div className="movie-formcard-year-container">
                    <h4>2013</h4>
                </div>
                <div className="movie-formcard-legenda-container">
                    <h6>O olho do inimigo está se movendo.</h6>
                </div> 

                <div className="movie-formcard-description-container">
                    <h4 className='movie-formcard-description'
                    >O confronto final entre as forças do bem e do 
                        mal que lutam pelo controle do futuro da Terra 
                        Média se aproxima. Sauron planeja um grande 
                        ataque a Minas Tirith, capital de Gondor, 
                        o que faz com que Gandalf e Pippin partam 
                        para o local na intenção de ajudar a 
                        resistência. Um exército é reunido por 
                        Theoden em Rohan, em mais uma tentativa 
                        de deter as forças de Sauron. Enquanto isso, 
                        Frodo, Sam e Gollum seguem sua viagem rumo à 
                        Montanha da Perdição para destruir o anel.</h4>
                </div>

            </div>

            <div className="base-card movie-detail-card">
                                   
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 input-form-container">
                        <input
                            {...register("text", {
                            required: 'Campo obrigatório',
                            })}
                            type="text"
                            className={`form-control base-input ${errors.text} ? 'is-invalid' : ''}`}
                            placeholder="Deixe sua avaliação aqui"
                            name="text"  />
                        <div className="btn-salvar-avaliacao">
                            <ButtonSave texte="SALVAR AVALIAÇÃO"/>
                        </div>
                    </div>

                    <div className="row-form-container">

                        {movie?.reviews.map(obj => (
                        <div key={obj.id} className="col-xl-6 review" >                       
                            <>
                            <div className="review-name">
                                <img src={StarIcon} alt="Star" />  
                                <h1>{obj?.user.name}</h1>
                            </div>
                            <div className="review-form-container">
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

export default MovieFormCard;

