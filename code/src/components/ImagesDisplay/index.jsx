import ImageItem from '../ImageItem'
import styles from './index.less'

const ImagesDisplay = ({
    imageList,
    column,
    size = '20px'
}) => {
    const style = column && {
        width:`${100/column}%`
    }
    return (
        <div className={styles['image_list']}>
            {
                imageList.map(item => (
                    <ImageItem
                        image={item}
                        style={style}
                        size={size}
                    />
                ))
            }
        </div>
    )
}

export default ImagesDisplay