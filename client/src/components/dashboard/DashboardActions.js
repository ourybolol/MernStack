import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
    return (
        <div class="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fa fa-user-circle text-primary"></i> modifier profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fa fa-black-tie text-primary"></i> Ajouter Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fa fa-graduation-cap text-primary"></i> Ajouter Education
            </Link>
        </div>
    )
}

export default DashboardActions
