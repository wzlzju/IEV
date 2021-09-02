import styles from './index.less'

const ImageItem = ({
    image,
    style,
    size
}) => {
    return (
        <div className={styles['image_item']} key={image.name} style={style}>
            <img className={styles['image']} src={image.img} alt={image.name} style={{width:size}}/>
            <div className={styles['image_name']}>{image.name}</div>
        </div>
    )
}

export default ImageItem