import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, useGSAP, MotionPathPlugin, Draggable, CustomEase);

export { gsap, ScrollTrigger, MotionPathPlugin, Draggable, CustomEase };
