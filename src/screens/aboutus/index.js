import React from "react";
import Header from '../../components/header'
import './index.scss';

function AboutUs(){
    return(
        <div className="about-us-wrapper">
            <Header/>

            <div className="text-wrapper">
                <span className="text">
                Who we are?
                <br></br><br></br>
                Fuzzle Team is proud to present the site fuzzle.online! The purpose of the site is to give the user a challenging game experience in different and varied games.
                <br></br><br></br>
                In each update we will add more and more games.
                <br></br><br></br>
                Our ambition is to grow and develop and become a site for particularly challenging thinking games.

                <br></br><br></br><br></br><br></br>
                
                We are excited to know what the future holds for us, and where the site will take the creativity we have built.
                There is something to look forward to... :)
                </span>
            </div>
        </div>
    )
}

export default AboutUs;