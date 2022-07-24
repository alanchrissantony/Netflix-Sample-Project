import React, { useState } from 'react'
import './Banner.css'
import axios from '../../Axios'
import {useEffect} from 'react'
import {imageUrl} from '../../Constants/Constants'
import {trending} from '../../urls'
import {API_KEY} from '../../Constants/Constants'
import YouTube from 'react-youtube'

function Banner() {
    const [movie, setMovie] = useState()
    useEffect(() => {
        axios.get(trending).then((response)=>{
            
            setMovie(response.data.results[0])
        })
    }, [])
    const opts = {
        height: '448',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    const [urlId, setUrlId] = useState('')
    const handleMovies=(id)=>{
        
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            if(response.data.results.length!==0){
                setUrlId(response.data.results[0])
            }
        })
    }
    return (
        <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path:''})`}} className='banner'>
            { urlId && <YouTube opts={opts} videoId={urlId.key} />}
            <div className="content">
                <h1 className="title">{movie ? movie.title:''}</h1>
                <div className="banner_buttons">
                    <button onClick={()=>handleMovies(movie.id)} className="button">Play</button>
                    <button className="button">My list</button>
                </div>
                <h1 className="description">{movie ? movie.overview:''}</h1>
            </div>
            
            <div className="fade_bottom">

            </div>
        </div>
    )
}

export default Banner
