import React from "react";
import { connect } from "react-redux";
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Navigate } from 'react-router-dom'
import Spinner from "../common/Spinner"
import { toast } from "react-toastify";

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

    handleDeleteCourse = async course => {
        toast.success('Course Deleted')
        try {
            await this.props.actions.deleteCourse(course)
        } catch(error) {
            toast.error('Delete failed. ' + error.message , { autoClose: false })
        }
    }

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Navigate to='/course' />}
                <h2>Courses</h2>
                { this.props.loading  ? <Spinner /> : (
                    <> 
                        <button 
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() => this.setState({ redirectToAddCoursePage: true })}
                        >
                            Add Course
                        </button>
                        <CourseList courses={this.props.courses} onDeleteClick={this.handleDeleteCourse} />
                    </>
                )}
            </>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
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
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)