import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus Component', () => {
    test('status in props should be in the state', () => {
        const component = create(<ProfileStatus status='Yo'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Yo');
    });
    test('<span> should be displayed', () => {
        const component = create(<ProfileStatus status='Yo'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });
    test(`after creation <input> should't be displayed`, () => {
        const component = create(<ProfileStatus status='Yo'/>);
        const root = component.root;

        expect(() => {
            let input = root.findByType('input');
        }).toThrow();

    });
    test('after creation <span> should contains with correct status', () => {
        const component = create(<ProfileStatus status='Yo'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('Yo');
    });
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='Yo'/>);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('Yo');
    })
    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='Yo' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});

