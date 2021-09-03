import { CSSProperties } from 'react'
import ImageItem, { Image } from './ImageItem'
import styles from './index.less'

export interface IImagesDisplayProps {
    imageList: Array<Image>,
    column: number,
    size: number,
    style?: Object
};

const ImagesDisplay: React.FC<IImagesDisplayProps> = (props) => {
    const { imageList, column, size, style } = props
    const styleAll = column ? {
        width:`${100/column}%`,...style
    } : {...style}
    return (
        <div className={styles['image_list']}>
            {
                imageList.map((item: Image) => (
                    <ImageItem
                        image={item}
                        key={item.key}
                        style={styleAll as CSSProperties}
                        size={size}
                    />
                ))
            }
        </div>
    )
}

export default ImagesDisplay