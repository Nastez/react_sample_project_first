import React from 'react';
import {create} from 'react-test-renderer';
import Paginator from "./Paginator";


describe('Paginator Component', () => {
    test('pages count 11 but should show only 10', () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        const spans = root.findAllByType('span');
        expect(spans.length).toBe(10);
    });
    test('if pages count more than 10 then button NEXT should be showing', () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        const button = root.findAllByType('button');
        expect(button.length).toBe(1);
    })
});

