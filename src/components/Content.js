import React, { useState, useEffect } from 'react'
import { useSchedule } from '../hooks/useSchedule'
import Item from './Item'

const Content = () => {
 const { response, loaded } = useSchedule()
 const [schedule, setSchedule] = useState([])

 useEffect(() => {
  loaded && setSchedule(response)
 }, [response, loaded])

 return <div style={styles.container}>{loaded && schedule.map((show) => <Item show={show} />)}</div>
}
const styles = {
 container: {
  display: 'flex',
  flexFlow: 'row wrap',
 },
}
export default Content
