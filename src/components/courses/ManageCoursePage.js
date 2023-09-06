import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from "./CourseForm"
import { useNavigate } from 'react-router-dom'

function ManageCoursePage({ loadAuthors, loadCourses, saveCourse, authors, courses, history, ...props })  {
    const [course, setCourse] = useState({...props.course})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => console.log('Loading courses error' + error))
        }

        if (authors.length === 0) {
            loadAuthors().catch(error => console.log('Loading authors error' + error))
        }
    }, [])

    function handleChange(event) {
        const { name, value } = event.target
        setCourse( prevCourse => ({
            ...prevCourse,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }))
    }

    function handleSave(event) {
        event.preventDefault()
        saveCourse(course).then(() => {
            navigate('../courses')
        })
    }

    return <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave}/>
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)