import ImageItem, { Image } from './ImageItem'
import styles from './index.less'

export interface IImagesDisplayProps {
    imageList: Array<Image>;
    column: number;
    size: number
};

const ImagesDisplay: React.FC<IImagesDisplayProps> = (props) => {
    const { imageList, column, size } = props
    const style = column ? {
        width:`${100/column}%`
    } : {}
    return (
        <div className={styles['image_list']}>
            {
                imageList.map((item: Image) => (
                    <ImageItem
                        image={item}
                        key={item.key}
                        style={style}
                        size={size}
                    />
                ))
            }
        </div>
    )
}

export default ImagesDisplay