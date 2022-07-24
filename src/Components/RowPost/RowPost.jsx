import React, { useEffect, useState } from 'react'
import './RowPost.css'
import {imageUrl} from '../../Constants/Constants'
import axios from '../../Axios'
import YouTube from 'react-youtube'
import {API_KEY} from '../../Constants/Constants'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.get(props.url).then((response)=>{
            
            setMovies(response.data.results)
        })
    },[])
    const opts = {
        height: '390',
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
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((movie)=>
                    <img onClick={()=>handleMovies(movie.id)} src={`${imageUrl+movie.backdrop_path}`} alt="" className={props.isSmall ? 'smallPoster':'poster'} />
                )}
            </div>
            { urlId && <YouTube opts={opts} videoId={urlId.key} />}
        </div>
    )
}

export default RowPost
