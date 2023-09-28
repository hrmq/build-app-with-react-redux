import React from "react"
import { render, screen } from "@testing-library/react"
import CourseForm from "./CourseForm"

function renderCourseForm(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    }

    const props = {...defaultProps, ...args}
    return render(<CourseForm {...props} />)
}

it('should render Add Course header', () => {
    renderCourseForm()
    screen.getByText('Add Course')
})

it('should label save button as Save when not saving', () => {
    renderCourseForm()
    screen.getByText('Save')
})

it('should label save button as Saving when saving', () => {
    renderCourseForm({ saving: true })
    screen.getByText('Saving...')
    // screen.debug()
})
