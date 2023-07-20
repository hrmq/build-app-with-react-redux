import React from "react";
import { connect } from "react-redux";
import * as courseActions from '../../redux/actions/courseActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux";
class CoursesPage extends React.Component {
    componentDidMount() {
        this.props.actions.loadCourses().catch(error => alert('Loading courses error' + error))
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
                <h2>Courses</h2>
                { this.props.course.map( course => (
                <div key={course.title}>{course.title}</div>
                ))}
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
        course: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)