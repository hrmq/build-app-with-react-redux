import React from "react"
import CourseForm from "./CourseForm"
import { shallow } from "enzyme"

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
    return shallow(<CourseForm {...props} />)
}

it('renders form and header', () => {
    const view = renderCourseForm()
    // console.log(view.debug())
    expect(view.find('form').length).toBe(1)
    expect(view.find('h2').text()).toEqual('Add Course')
})

it('labels save buttons as Save when not saving', () => {
    const view = renderCourseForm()
    expect(view.find('button').text()).toBe('Save')
})

it('labels save buttons as Saving when saving', () => {
    const view = renderCourseForm({ saving : true })
    expect(view.find('button').text()).toBe('Saving...')
})