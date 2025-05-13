import React from 'react'
import { chipImg, frameImg, frameVideo } from '../assets/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);

export const Chip = () => {
    useGSAP(() => {
        const anim = gsap.from("#chipImg", {
            scale: 2,
            opacity: 0,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "chipImg",
                start:"center bottom",
            }
        })
    }, [])
  return (
    <section>
        <div className = "flex flex-col items-center mt-15">
            <div className = "h-screen flex flex-col items-center">
                <div id = "chipImg" className = "pt-20">
                    <img src = {chipImg} width={180} height={180} alt = "iPhone 15 chip A17 PRO"/>
                </div>
                <div className = "mt-20">
                    <h1 className = "text-4xl md:text-6xl lg:text-7xl font-semibold mt-7 text-center">A17 Pro chip.<br/>A monster win for gaming.</h1>
                    <p className = "text-[#86868b] font-semibold text-xl md:text-2xl md:pt-2.5 text-center mt-7 mb-5">It's here. The biggest redesign in the history of Apple GPUs.</p>
                </div>
            </div>
            

            <div className = "common-padding -mt-40">
                <div className = "relative flex justify-center md:w-[75%] md:mx-auto">
                    <img className = "z-1" src = {frameImg} alt = "iPhone frame"/>
                    <video className = "rounded-[32px] absolute bottom-[10px] md:bottom-[26px] w-[95%]" autoPlay muted>
                        <source src = {frameVideo} type = "video/mp4"></source>
                    </video>
                </div>
                    <p className = "text-[#86868b] font-semibold text-center my-4">Honkai: Star Rail</p>
                    
                <div className = "flex md:flex-row gap-x-5 justify-center items-center common-padding">
                    <div className = "w-1/2 ">
                        <p className = "explore-text max-sm:mb-17">A17 Pro is an entirely new class of iPhone chip that delievers our 
                         <span className = "text-white"> best graphic performance by far. </span>
                            Mobile <span className = "text-white">games will look and feel so immersive </span>
                            with incredibly detailed environments and characters.
                         </p>
                    </div>
                    <div className = "">
                        <p className = "explore-text mb-2">New</p>
                        <p className = "font-semibold text-xl md:text-5xl">Pro-class GPU</p>
                        <p className = "explore-text mt-2">with 6 cores</p>
                    </div>
                </div>
                
                
            </div>
        </div>
    </section>
  )
}
