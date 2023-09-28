import React from "react"
import { mount } from "enzyme"
import { authors, newCourse, courses } from '../../../tools/mockData'
import { ManageCoursePage } from './ManageCoursePage'

function render(args) {
    const defaultProps = {
        authors,
        courses,
        history: {},
        saveCourses: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    }

    const props = {...defaultProps, ...args}
    return mount(<ManageCoursePage {...props} />)
}

it.skip('sets error when attempting to save an empty title field', () => {
    const view = render()
    view.find('form').simulate('submit')
    const error = view.find('.alert').first()
    expect(error.text()).toBe('Title is required')
})