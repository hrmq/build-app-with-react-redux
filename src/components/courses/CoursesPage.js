import React from "react";
import { connect } from "react-redux";
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'

class CoursesPage extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            course: {
                title: ''
            }
        }
    }

    handleChange = (event) => {
        const course = {...this.state.course, title: event.target.value}
        this.setState({ course: course })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createCourse(this.state.course)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.course.title}
                />

            <input type="submit" value="Save" />
               { this.props.course.map( course => (
                <div key={course.title}>{course.title}</div>
               ))}
            </form>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        course: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createCourse: course => dispatch(courseActions.createCourse(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)