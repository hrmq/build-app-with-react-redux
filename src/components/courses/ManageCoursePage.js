import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'

function ManageCoursePage({ loadAuthors, loadCourses, authors, courses })  {
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => console.log('Loading courses error' + error))
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => console.log('Loading authors error' + error))
        }
    }, [])

    return (
        <>
            <h2>Manage Courses</h2>
        </>
    )
}

ManageCoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)