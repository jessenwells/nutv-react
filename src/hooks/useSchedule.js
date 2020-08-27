import { useState, useEffect } from 'react'

export const useSchedule = () => {
 const [response, setResponse] = useState()
 const [loaded, setLoaded] = useState(false)
 /// TVmaze Schedule
 const getSchedule = async () => {
  const webChannels = [1, 2, 3, 4, 43, 52, 77, 170, 187, 202, 213, 244, 250, 287, 289, 310, 325, 329, 347]
  // get full schedule
  const showSchedule = await fetch('http://api.tvmaze.com/schedule/full')
  const showScheduleJson = await showSchedule.json()
  const showScheduleData = await showScheduleJson
  // filter for premieres - filter web channels - sort by airdate
  const showScheduleFilter = showScheduleData
   .filter(
    (res) =>
     res.number === 1 &&
     res._embedded.show.image !== null &&
     (res._embedded.show.status === 'Running' || res._embedded.show.status === 'In Development') &&
     (res._embedded.show.network !== null || webChannels.includes(res._embedded.show.webChannel.id)) &&
     (res._embedded.show.network === null || res._embedded.show.network.country.code === 'US'),
   )
   .sort((a, b) => (new Date(a.airstamp) > new Date(b.airstamp) ? 1 : -1))
  setResponse(showScheduleFilter)
  setLoaded(true)
 }
 useEffect(() => {
  getSchedule()
 }, [])
 return { response, loaded }
}
