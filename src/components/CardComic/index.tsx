import { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import styles from './styles.module.scss'

export default function CardComic(props){
    console.log('thumbnail', props.thumbnail)
    console.log('thumbnail', props.description)
    const [modalIsOpen,setIsOpen] = useState(false);

    const backgroundIMG = `url(${props.thumbnail.path}.${props.thumbnail.extension})`
    const srcIMG = `${props.thumbnail.path}.${props.thumbnail.extension}`

    const customStyles = {
        content : {
            border: 'none',
            background: 'var(--black)',
            height : '500px',
            width : '900px',
            padding: '0px',
          top                   : '40%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'          
        }
      };    

    // Modal.setAppElement(document.getElementById('root'))
    Modal.defaultStyles.overlay.backgroundColor = 'rgb(0 0 0 / 82%)';

    function showComicDetails(){
        console.log("roiiii");
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const [isChecked, setIsChecked] = useState(false)

    function handleInputChange(){
        setIsChecked(!isChecked);
        props.isSelected = !isChecked;
    }

    return (
        <>
            <div className={styles.cardContainer} style={{backgroundImage: backgroundIMG, backgroundSize: 'cover'}}>

                <div className={styles.cardContent}>
                    {/* <input type="checkbox" /> */}
                    <p>{props.title}</p>
                    {/* <button type="button">
                        Details
                    </button> */}
                </div>
                <input type="checkbox" checked={isChecked} onChange={handleInputChange}/>
            </div>

            
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                >
                    {/* <div className={styles.containerModal} style={{backgroundImage: backgroundIMG, backgroundSize: 'cover'}}>                         */}
                    <div className={styles.containerModal} > 
                        <div>
                            <img src={srcIMG} alt="" className={styles.backgroundIMG}/>
                            <button type="button" onClick={closeModal}>
                                <img src="/icons/close.svg" alt="Fechar modal" />
                            </button>
                        </div>
                        <div className={styles.infoModal}>
                        <h2>{props.title} - {props.id}</h2>
                        {/* <strong>{props.id}</strong> */}
                        <p>{props.description}</p>
                        </div>
                    </div>

                    {/* <div className={styles.footerModal}>
                        <h2>{props.title} - {props.id}</h2>                        
                        <p>{props.description}</p>
                    </div>  */}
                </Modal>
            
        </>
    );
}