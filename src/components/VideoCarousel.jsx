import React, { useRef, useState } from 'react'
import { hightlightsSlides } from '../assets/constants';
import { pauseImg, playImg, replayImg } from '../assets/utils';
import gsap from 'gsap';
import { useEffect} from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoDivRef = useRef([]);
    const videoSpanRef = useRef([]);

    const [video,setVideo] = useState(
        {
            videoID:0,
            startPlay: false,
            isPlaying: false,
            isEnd: false,
            isLastVideo: false
        }
    )
    const {videoID, startPlay, isPlaying, isEnd, isLastVideo} = video;

    const [metaData,setMetaData] = useState([]);

    const handleProcess = (type, i) => {
        switch(type) {
            case "video-end":
                setVideo((prev)=>({...prev,videoID: i + 1, isEnd: true}));
                break;
            case "video-last": 
                setVideo((prev)=>({...prev,isLastVideo: true}));
                break;
            case "video-pause":
                setVideo((prev)=>({...prev,isPlaying: !prev.isPlaying}));
                break;
            case "video-play":
                setVideo((prev)=>({...prev,isPlaying: !prev.isPlaying}));
                break;
            case "video-replay":
                setVideo((prev)=>({...prev,videoID: 0, isLastVideo: false }));
                break;
            default:
                return video;

        }
    }

    const controlVideo = () => {
        isLastVideo ? handleProcess("video-replay") :
        isPlaying ? handleProcess("video-pause") : handleProcess("video-play");
    }

    useGSAP(()=>{
        //slide animation to bring next video in the viewport
        gsap.to("#slider", {
            x: `${-100 * videoID}%`,
            duration: 2,
            ease: "power2.inOut"
        }),
        // video animation to play the video when it is in the view
        gsap.to(".video", {
            scrollTrigger: {
                target: ".video",
                toggleActions: "restart none none none"
            },
            onComplete: () =>{
                setVideo((prev) => (
                    {...prev, startPlay: true, isPlaying: true}
                ))
            }

        })
    },[isEnd, videoID])
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoID]){
            //animation to move the indicator
            let anim = gsap.to(span[videoID], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if(progress !== currentProgress) {
                        currentProgress = progress;

                        //set the width of the progress bar
                        gsap.to(videoDivRef.current[videoID], {
                            width: 
                                window.innerWidth < 1200 
                                  ? '10vw' //mobile and tablet
                                  : '4vw' //laptop
                        });

                        //set the background color of the progress bar
                        gsap.to(span[videoID], {
                            backgroundColor: "white",
                            width: `${currentProgress}%`
                        });
                    }
                },
                // when the video is ended, replace the progress bar with the indicator and change the background color
                onComplete: () => {
                    if(isPlaying){
                        gsap.to(videoDivRef.current[videoID], {
                            width: '12px',
                        }),
                        gsap.to(span[videoID], {
                            backgroundColor: "#afafaf"
                    })
                    }
                    
                }
            })
        
        if(videoID === 0) anim.restart();

        //update the progress bar
        const animUpdate = () => {
            anim.progress(
                videoRef.current[videoID].currentTime /
                hightlightsSlides[videoID].videoDuration
            )
        }
        if(isPlaying)
            // ticker to update the progress bar
            gsap.ticker.add(animUpdate);
        else 
            // remove the ticker when the video is paused (progress bar is stopped)
            gsap.ticker.remove(animUpdate);
        }
    }, [videoID, startPlay]);

    useEffect(() => {
        if(metaData.length > 3){
            if(!isPlaying){
                videoRef.current[videoID].pause();
            }
            else{
                startPlay && videoRef.current[videoID].play();
            }
        }
        
    }, [startPlay, videoID, isPlaying, metaData])

  return (
    <section className = "overflow-hidden relative bottom-6">
        <div className = "flex lg:ml-40">
            {hightlightsSlides.map((item,i)=>(
                 <div className = "relative bg-black mr-4 m-auto ml-4 rounded-3xl"  id = "slider" key = {item.id}>
                    <div className = "absolute font-semibold text-xl top-1/6 pl-7">{item.textLists.map((text,i)=>(
                        <p key = {i}>{text}</p>
                    )
                    )}
                    </div>
                    <div className = "w-[90vw] sm:w-[70vw] md:h-[70vh] sm:h-[50vh] h-[35vh] flex justify-center">
                        <video  className = "rounded-3xl video w-full object-fill" muted playsInline={true} preload="auto"
                         ref = {(elem)=>(videoRef.current[i] = elem)}
                         onPlay = {()=>setVideo((prev)=>({...prev,isPlaying:true}))}
                         onEnded = {()=>
                            i === hightlightsSlides.length - 1 ?
                            handleProcess("video-last"): handleProcess("video-end", i)
                         }
                         onLoadedMetadata={(e)=>setMetaData((prev) => [...prev, e])}
                         >
                            <source src = {item.video} type = "video/mp4"/>
                        </video>
                    </div>
                </div>
                )
            )}
        </div>

        <div className = "w-screen h-[30vh] flex justify-center items-center bottom-10 gap-4 relative">
            <div className = "w-50 h-3/12 bg-[#42424570] rounded-4xl flex justify-center items-center gap-5">
                {videoRef.current.map((_,i)=>(
                    <span key = {i}
                        className = "bg-[#afafaf] w-3 h-3 relative rounded-full cursor-pointer"
                        ref = {(elem)=>(videoDivRef.current[i] = elem)}>
                            
                        <span className = " absolute w-full h-full rounded-full" 
                              ref = {(elem)=>(videoSpanRef.current[i] = elem)}>
                        </span>
                    </span>
                ))}
            </div>
            <button onClick = {controlVideo} className = "cursor-pointer h-3/12 aspect-square rounded-full bg-[#42424570]">
                <img className = "m-auto" 
                    src = {isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                    alt = {isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}/>
            </button>
        </div>
    </section>
  )
}

export default VideoCarousel
