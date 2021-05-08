import styles from './styles.module.scss'

export default function CardComic(props){
    console.log('thumbnail', props.thumbnail)

    const backgroundIMG = `url(${props.thumbnail.path}.${props.thumbnail.extension})`

    function teste(){
        
    }

    return (
        <div className={styles.cardContainer} style={{backgroundImage: backgroundIMG}} onClick={teste}>

            <div className={styles.cardContent}>
                <p>{props.title}</p>
                {/* <button type="button">
                    Details
                </button> */}
            </div>
        </div>
    );
}