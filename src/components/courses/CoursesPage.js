import React from "react";
import { connect } from "react-redux";
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Navigate } from 'react-router-dom'
class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }

    componentDidMount() {
        if (this.props.courses.length === 0) {
            this.props.actions.loadCourses().catch(error => console.log('Loading courses error' + error))
        }

        if (this.props.authors.length === 0) {
            this.props.actions.loadAuthors().catch(error => console.log('Loading authors error' + error))
        }
    }
    // constructor(props) {
    //     super(props)
        
    //     this.state = {
    //         course: {
    //             title: ''
    //         }
    //     }
    // }

    // handleChange = (event) => {
    //     const course = {...this.state.course, title: event.target.value}
    //     this.setState({ course: course })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault()
    //     this.props.actions.createCourse(this.state.course)
    // }

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Navigate to='/course' />}
                <h2>Courses</h2>
                <button 
                    style={{ marginBottom: 20 }}
                    className="btn btn-primary add-course"
                    onClick={() => this.setState({ redirectToAddCoursePage: true })}
                >
                    Add Course
                </button>
                <CourseList courses={this.props.courses} />
            </>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 
        ? [] 
        :state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(author => author.id === course.authorId).name
            }
        }),
        authors: state.authors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)