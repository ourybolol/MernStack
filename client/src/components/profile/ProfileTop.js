import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileTop = ({ 
    profile: {
        status,
        company,
        website,
        location,
        social,
        user: { name,  avatar}
    }   
}) => {
    return (
        <div className="profile-top bg-primary p-1">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />
            <h1 className="large">{name}</h1>
            <p className="lead">{status} {company && <span> Chez {company}</span>}</p>
            <p>{location && <span><i className="fa fa-map-marker-alt"/> {location}</span>}</p>
            <div className="icons my-1">
                {website && (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-globe fa-2x"></i>
                        </a>
                )}
                {social && social.twitter && (
                        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-twitter fa-2x"></i>
                        </a>
                )}
                {social && social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-facebook fa-2x"></i>
                        </a>
                )}
                {social && social.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-linkedin fa-2x"></i>
                        </a>
                )}
                {social && social.youtube && (
                        <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-youtube fa-2x"></i>
                        </a>
                )}
                {social && social.instagram && (
                        <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-instagram fa-2x"></i>
                        </Link>
                )}
                
                
            </div>
      </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
