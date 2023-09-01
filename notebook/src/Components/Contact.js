import React from 'react';
import image from './logo-no-background.png';
import { Link } from 'react-router-dom';

const Contact = (props) => {
    document.title = `${props.title} | NoteKaro`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <h1 className="text-danger" style={{ fontSize: '4vw', textDecoration: 'underline' }}>Contact Us</h1>
                    <p style={{ fontSize: '1.5vw', color: 'white' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum corrupti eveniet recusandae odio illum autem dolores nihil quo explicabo, ratione itaque numquam ea quam eaque voluptas quaerat sequi molestias pariatur reiciendis magni ducimus, blanditiis nam harum mollitia. Quas, accusamus voluptas!
                    </p>
                    <div className="d-flex justify-content-evenly" style={{ fontSize: '3vw' }}>
                        <Link to={"https://www.instagram.com/"}><i className="fa-brands fa-instagram text-danger"></i></Link>
                        <Link to={"https://www.facebook.com"}><i className="fa-brands fa-facebook"></i></Link>
                        <Link to={"https://www.twitter.com"}><i className="fa-brands fa-square-x-twitter text-dark bg-light"></i></Link>
                        <Link to={"https://www.whatsapp.com/"}><i className="fa-brands fa-whatsapp text-success"></i></Link>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <img src={image} alt='' className="img-fluid" style={{ maxWidth: '50%' }} />
                </div>
            </div>
        </div>
    );
};

export default Contact;
