import './styles.css'


type Props ={
    texte: string;
}

const ButtonSave = ({ texte } : Props) => {

    return (
        <div  className="btn-container-save">
            <button className="btn-save">
                <h6>{texte}</h6>
            </button>            
        </div>
        
    );
}

export default ButtonSave;