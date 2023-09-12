import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from '../../redux/actions/courseActions'
import { loadAuthors } from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from "./CourseForm"
import { useNavigate } from 'react-router-dom'
import Spinner from "../common/Spinner"
import { toast } from "react-toastify";

const newCourse = {
    id: null,
    title: "",
    authorId: null,
    category: ""
}

function ManageCoursePage({ loadAuthors, loadCourses, saveCourse, authors, courses, history, ...props })  {
    const [course, setCourse] = useState({...props.course})
    const [errors, setErrors] = useState({})
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => console.log('Loading courses error' + error))
        } else {
            setCourse({ ...props.course })
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
        setSaving(true)
        saveCourse(course).then(() => {
            toast.success('Course Saved.')
            navigate('../courses')
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }

    return (
        authors.length === 0 || course.length === 0 
        ? (<Spinner/>) 
        : <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} saving={saving}/>
    )
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null
}

function mapStateToProps(state) {
    // const slug = ownProps.match.params.slug
    const slug = null
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.course, slug) : newCourse
    return {
        course,
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