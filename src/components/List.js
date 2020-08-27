import React from 'react'

const List = (show) => {
 return (
  <div>
   <img src={`${imgPath + show.show.poster}`} alt='' style={styles.image} />
  </div>
 )
}

let imgPath = 'https://www.thetvdb.com/banners/'

let styles = {
 image: {
  width: '175px',
 },
}

export default List
