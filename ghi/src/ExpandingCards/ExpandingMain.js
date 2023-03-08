import React from 'react';
import ExpandingCards from './ExpandingCard';
import './MainPageLoggedIn.css';
import swup1 from './img/swup1.jpg';
import swup2 from './img/swup2.jpg';
import swup3 from './img/swup3.jpg';
import swup4 from './img/swup4.jpg';
import swup5 from './img/swup5.jpg';



function  ExpandingMain() {
// 'https://images.unsplash.com/photo-1560843300-ce9370f96b56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//     'https://images.unsplash.com/photo-1561763439-fb89720fc359?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2094&q=80',
//     'https://images.unsplash.com/photo-1504222013707-cd1090517aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1493&q=80'
const images = [
    {
        id: 1,
        title: "Need to get rid of some Trash?",
        url: swup1,
        active: true,
        button: "Schedule a pickup",
        nav: "/newpickup"
    },
    {
        id: 2,
        title: "Want to Become a Swooper?",
        url: swup2,
        active: false,
        button: "Swooper Form",
        nav: "/swoopers/signup"
    },
    {
        id: 3,
        title: "Already a Swooper?",
        url: swup3,
        active: false,
        button: "Swoop List",
        nav: "/listings"
    },
    {
        id: 4,
        title: "Need to edit your Profile?",
        url: swup4,
        active: false,
        button: "Update Profile",
        nav:"/profile"
    },
    {
        id: 5,
        title: "Meet the Team",
        url: swup5,
        active: false,
        button: "About us"
    },


]
return (
    <>
    <div className="pt-5 pb-5"></div>
    <h1 style={{textAlign: "center", margin:"-37px", padding:"0px"}} className="pt-5">Explore</h1>
    <div className="expanding-body">

        <ExpandingCards data={images}/>
    </div>

    </>
)}

export default ExpandingMain
