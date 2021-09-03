import { useCallback } from "react"
// import '../../assets/images/national-flags/china.png'
// import china from ''

const NationalFlags = ({nationNames, path = '../../assets/images/national-flags/'}) => {
    const changeNationNameCase = useCallback((name) => {
        return name.split(' ').map(item => item.toLowerCase()).join(' ')
    }, [])

    const imgs = nationNames.map((nationName) => {
        const fileName = changeNationNameCase(nationName)
        const filePath = path + fileName + '.png'
        const chinaPath = '../../assets/images/national-flags/china.png'
        return (<div className='display_box'>
            {/* <image src={require(`${path}${fileName}.png`)}/> */}
            <img src={require('../../assets/images/national-flags/china.png').default}/>
            <p>{nationName}</p>
        </div>)
    })

    return (
        <div className='display_flags'>
            {imgs}
        </div>
    )
}

export default NationalFlags