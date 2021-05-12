import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import styles from './styles.module.scss'

export default function CardComic({comic}){    
    const [modalIsOpen,setIsOpen] = useState(false);

    const backgroundIMG = `url(${comic.thumbnail.path}.${comic.thumbnail.extension})`
    const srcIMG = `${comic.thumbnail.path}.${comic.thumbnail.extension}`

    const customStyles = {
        content : {
            border: 'none',
            background: 'var(--black)',
            height: '500px',
            width: '900px',
            padding: '0px',
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'          
        }
      };    

    // Modal.setAppElement(document.getElementById('root'))
    Modal.defaultStyles.overlay.backgroundColor = 'rgb(0 0 0 / 82%)';

    function showComicDetails(){        
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const [isChecked, setIsChecked] = useState(false)

    function handleInputChange(){        
        setIsChecked(!isChecked);         
        comic.isSelected = !isChecked;             
    }

    return (
        <>
            <div className={styles.cardContainer} style={{backgroundImage: backgroundIMG, backgroundSize: 'cover'}}>

                <div className={styles.cardContent}>                                        
                    <div onClick={handleInputChange} className={isChecked ? 'checked' : ''}> 
                        <p>{comic.title}</p>                                               
                    </div>
                </div>

                <div className={styles.details}>
                    <button type="button" onClick={showComicDetails}>
                        Details
                    </button>
                </div>                
            </div>
            
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                >                   
                    <div className={styles.containerModal} > 
                        <div>
                            <img src={srcIMG} alt="" className={styles.backgroundIMG}/>
                            <button type="button" onClick={closeModal}>
                                <img src="/icons/close.svg" alt="Fechar modal" />
                            </button>
                        </div>
                        <div className={styles.infoModal}>
                        <h2>{comic.title} - {comic.id}</h2>                        
                        <p>{comic.description}</p>
                        </div>
                    </div>                    
                </Modal>
            
        </>
    );
}