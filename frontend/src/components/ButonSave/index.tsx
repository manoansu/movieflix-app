import './styles.css'


type Props ={
    text: string;
}

const ButtonSave = ({ text } : Props) => {

    return (
        <div  className="btn-container-save">
            <button className="btn-save">
                <h6>{text}</h6>
            </button>            
        </div>
        
    );
}

export default ButtonSave;