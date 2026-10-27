import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger,useGSAP)
export { gsap, ScrollTrigger, useGSAP }
export const motionTokens={duration:0.95,ease:'power3.out',stagger:0.09}

