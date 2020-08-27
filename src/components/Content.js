import React, { useState, useEffect } from 'react'
import { useSchedule } from '../hooks/useSchedule'
import List from './List'
import Item from './Item'

const Content = () => {
 const { response, loaded } = useSchedule()
 const [schedule, setSchedule] = useState([])
 const [watchlist, setWatchlist] = useState([])

 const setList = (series) => {
  setWatchlist([...watchlist, series])
  localStorage.setItem('watchlist', JSON.stringify([...watchlist, series]))
 }

 useEffect(() => {
  loaded && setSchedule(response)
  if (localStorage.watchlist) {
   setWatchlist(JSON.parse(localStorage.watchlist))
  }
 }, [response, loaded])

 return (
  <>
   <div style={styles.sidebar}>{loaded && watchlist.map((show, i) => <List show={show} key={i} />)}</div>
   <div style={styles.container}>{loaded && schedule.map((show, i) => <Item show={show} setList={setList} key={i} />)}</div>
  </>
 )
}
const styles = {
 container: {
  display: 'flex',
  flexFlow: 'row wrap',
 },
 sidebar: {
  display: 'flex',
  flexFlow: 'column wrap',
  minWidth: '200px',
 },
}

export default Content
