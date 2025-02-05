import React from 'react';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div>
      <footer>
            <div className="f-info flex flex-wrap h-24 justify-center items-evenly bg-[#ebebeb]">
                <div className="w-full flex justify-center items-center text-5xl align-middle">
                   <FontAwesomeIcon icon={faSquareFacebook} className='text-xl ml-4'/>
                   <FontAwesomeIcon icon={faSquareInstagram} className='text-xl ml-4'/>
                   <FontAwesomeIcon icon={faLinkedin} className='text-xl ml-4'/>
                </div>
                <div className="w-full flex justify-center items-center">
                &copy;  GatherUp Private Limited
                </div>
                <div className="w-full flex justify-center items-center">
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer;
