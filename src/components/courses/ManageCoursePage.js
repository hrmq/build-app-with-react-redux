import React from "react";
import { connect } from "react-redux";
import { loadCourses } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'

class ManageCoursePage extends React.Component {
    componentDidMount() {
        const { loadAuthors, loadCourses, authors, courses } = this.props

        if (courses.length === 0) {
            loadCourses().catch(error => console.log('Loading courses error' + error))
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => console.log('Loading authors error' + error))
        }
    }

    render() {
        return (
            <>
                <h2>Manage Courses</h2>
            </>
        )
    }
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