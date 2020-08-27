import React, { useState, useEffect } from 'react'
import { useTvdb } from '../hooks/useTvdb'

const Item = (show) => {
 const { response, loaded } = useTvdb(show)
 const [meta, setMeta] = useState()

 useEffect(() => {
  loaded && setMeta(response)
 }, [response, loaded])

 return (
  loaded && (
   <>
    {meta && meta.poster && (
     <div style={styles.imageWrap} className={classes(meta.genre)}>
      <img src={`https://www.thetvdb.com/banners/${meta.poster}`} alt='' style={styles.image} />
     </div>
    )}
   </>
  )
 )
}

const classes = (genre) => genre && `${genre.join(' ')}`.replace('  ', ' ').toLowerCase()

let styles = {
 imageWrap: {
  width: '330px',
  margin: '5px 5px 0 5px',
 },
 image: {
  width: '100%',
 },
}

export default Item
