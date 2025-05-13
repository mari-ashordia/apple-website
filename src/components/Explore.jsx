import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { explore1Img, explore2Img, exploreVideo } from '../assets/utils'
import ScrollTrigger from 'gsap/all'
import { transformWithEsbuild } from 'vite'
gsap.registerPlugin(ScrollTrigger);

export const Explore = () => {
    const videoRef = useRef();
    useGSAP(() => {
        gsap.to("#explore-title", {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: "#explore-title",
                start: "center bottom"
            }
        })
        gsap.to("#explore_video", {
            scrollTrigger: {
                trigger: "#explore_video",
                toggleActions: "restart none none none",
                onEnter: () => videoRef.current.play(),
                onEnterBack: () => videoRef.current.play(),
            },

        })
        gsap.to(".explore_img",{
            scale: 1,
            opacity:1,
            duration: 2,
            ease: 'power1',
            scrollTrigger: {
                trigger: ".explore_img",
                scrub: 5.5,
                toggleActions: 'restart reverse restart reverse',
                start: 'top 85%',
            }
        })
        gsap.to(".explore-text", {
            scrollTrigger: {
                trigger:".explore-text",
                toggleActions: "restart none none none",
                start:"center top"
            },
            opacity: 1,
            y: 0,
            delay:1,
            duration:2
        })
    }, [])
    

  return (
    <section className = "bg-[#101010]">

        <div id = "explore-title" className = "common-padding explore-heading">
            <h1>Explore the full story.</h1>
        </div>
        <div className = "common-padding relative lg:bottom-20">
            <p className = "explore-iphone">iPhone.<br/>Forged in titanium.</p>
        </div>

        <div className = "common-padding flex flex-col gap-5 justify-center items-center relative md:-top-60">
            <div className = "lg:w-4xl">
                <video id = "explore_video" ref = {videoRef} muted>
                    <source src = {exploreVideo}/>
                </video>
            </div>
            <div className = "flex lg:flex-row gap-5 lg:w-4xl">
                <div className = "object-cover h-[50vh] lg:w-[30vw] overflow-hidden">
                    <img className = "explore_img opacity:0 scale-150" src = {explore1Img}/>
                </div>
                <div className = "object-cover h-[50vh] lg:w-[30vw] overflow-hidden">
                    <img className = "explore_img opacity:0 scale-150" src = {explore2Img}/>
                </div>
            </div>
        </div>
        
        <div className = "pl-8 flex flex-col md:flex-row md:w-7/11 relative lg:gap-3 md:bottom-70 md:mx-auto">
            <p className = "explore-text">iPhone 15 Pro is <span className = "text-white">the first iPhone to feature an 
                aerospace-grade titanium design</span>, using the same alloy that spacerafts use for 
                missions tom Mars.</p><br/>
            <p className = "explore-text max-sm:mb-30">Titanium has one of the best strength-to-weight ratios of
                any metal, making these our <span className = "text-white">lightest Pro models ever.</span>You'll notice
                the difference the moment you pick one up.
            </p>
        </div>

    </section>
  )
}
