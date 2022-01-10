import { AxiosRequestConfig } from 'axios';
import StarIcon from '../../assets/images/star.png';
import ButtonSave from 'components/ButonSave';
import { Movie } from 'types/movie';
import { requestBackend } from 'util/request';
import './styles.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
            <div className="base-card movie-details-card">
                <div className="movie-title">
                    <h1>Tela detalhes do filme id: {movie?.id}</h1>
                </div>
                    
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 input-container">
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

                    <div className="row-container">

                        {movie?.reviews.map(obj => (
                        <div key={obj.id} className="col-xl-6 review" >                       
                            <>
                            <div className="review-name">
                                <img src={StarIcon} alt="Star" />  
                                <h1>{obj?.user.name}</h1>
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

export default MovieFormCard;

