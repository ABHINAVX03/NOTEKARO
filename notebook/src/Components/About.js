import React from 'react';
import image from './logo-no-background.png';

const About = (props) => {
    document.title = `${props.title} | NoteKaro`;

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <h1 className="text-danger" style={{ fontSize: '4vw', textDecoration: 'underline' }}>About Us</h1>
                    <p style={{ fontSize: '1.5vw', color: 'white' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum corrupti eveniet recusandae odio illum autem dolores nihil quo explicabo, ratione itaque numquam ea quam eaque voluptas quaerat sequi molestias pariatur reiciendis magni ducimus, blanditiis nam harum mollitia. Quas, accusamus voluptas!
                    </p>
                </div>
                <div className="col-lg-6 col-md-12">
                    <img src={image} alt='' className="img-fluid" style={{ maxWidth: '50%' }} />
                </div>
            </div>
        </div>
    );
};

export default About;
