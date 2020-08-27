import { useState, useEffect } from 'react'

export const useTvdb = (seriesInfo) => {
 const [response, setResponse] = useState()
 const [loaded, setLoaded] = useState(false)

 useEffect(() => {
  let key = 'QZR34YS24AD0JLNP'
  const getTvdb = async () => {
   const getKey = await fetch('/login', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ apikey: key }),
    redirect: 'follow',
   })
   const resKey = await getKey.json()

   if (seriesInfo.show._embedded.show.externals.thetvdb) {
    const tvdbid = seriesInfo.show._embedded.show.externals.thetvdb
    const getSeries = await fetch(`/series/${tvdbid}`, {
     method: 'GET',
     mode: 'cors',
     redirect: 'follow',
     headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + resKey.token,
     },
    })
    const resSeries = await getSeries.json()
    setResponse(resSeries.data)
    setLoaded(true)
   } else if (seriesInfo.show._embedded.show.externals.imdb) {
    const imdbid = seriesInfo.show._embedded.show.externals.imdb
    const getSeries = await fetch(`/search/series?imdbId=${imdbid}`, {
     method: 'GET',
     mode: 'cors',
     redirect: 'follow',
     headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + resKey.token,
     },
    })
    const resSeries = await getSeries.json()
    const resSeriesId = (await resSeries.data) && resSeries.data.shift()
    setResponse(resSeriesId)
    setLoaded(true)
   }
  }
  getTvdb()
 }, [seriesInfo])
 return { response, loaded }
}
