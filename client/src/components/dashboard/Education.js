import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id} className="bg-info">
            <td>{ edu.school }</td>
            <td className="hide-sm">{ edu.degree }</td>
            <td className="hide-sm">{ edu.fieldofstudy }</td>
            <td>
                <Moment format="YYYY/MM/DD">{ edu.from }</Moment> -{' '} 
                {edu.to === null ? (
                    ' Now') : (
                        <Moment format="YYYY/MM/DD">{ edu.to }</Moment>
                )}
            </td>
            <td>
                <button onClick={ e => deleteEducation(edu._id)} className="btn btn-danger">Supprimer</button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="my-2">informations Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>École</th>
                        <th className="hide-sm">Niveau</th>
                        <th className="hide-sm">Filière</th>
                        <th className="hide-sm">Années</th>
                        <th className="hide-sm">Action</th>
                    </tr>
                </thead>
                <tbody>{ educations }</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(
    null,
    { deleteEducation}
)(Education) 
