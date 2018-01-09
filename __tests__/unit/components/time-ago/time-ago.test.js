import React from 'react';
import { mount } from 'enzyme';

import TimeAgo from '../../../../src/js/components/time-ago/time-ago';

describe('TimeAgo component', () => {
    let timeAgo = null;

    it('test just now label', () => {
        timeAgo = <TimeAgo date={Date.now()} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('just now');
    });

    it('test 30 seconds ago label', () => {
        timeAgo = <TimeAgo date={Date.now() - 30 * 1000} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('30 seconds ago');
    });

    it('test 1 minute ago label', () => {
        timeAgo = <TimeAgo date={Date.now() - 60 * 1000} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('1 minute ago');
    });

    it('test 1 hour ago label', () => {
        timeAgo = <TimeAgo date={Date.now() - 60 * 60 * 1000} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('1 hour ago');
    });

    it('test 2 hours ago label', () => {
        timeAgo = <TimeAgo date={Date.now() - 2 * 60 * 60 * 1000} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('2 hours ago');
    });

    it('test future date label', () => {
        const date = new Date();
        const futureDate = new Date(date.setFullYear(date.getFullYear() + 1)).setDate(date.getDate() + 1);

        timeAgo = <TimeAgo date={futureDate} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('in 1 year');
    });

    it('test className', () => {
        timeAgo = <TimeAgo date={Date.now()} classNames="test-class" />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.props().classNames).toEqual('test-class');
        expect(timeAgoComponent.find('.time-ago').hasClass('test-class')).toEqual(true);
    });

    it('test isLiveUpdate = false', async () => {
        timeAgo = <TimeAgo date={Date.now() - 30 * 1000} isLiveUpdate={false} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('30 seconds ago');

        await new Promise(resolve => setTimeout(resolve, 3000));
        expect(timeAgoComponent.text()).toEqual('30 seconds ago');
    });

    it('test componentDidUpdate', () => {
        timeAgo = <TimeAgo date={Date.now() - 30 * 1000} />;

        const timeAgoComponent = mount(timeAgo);
        expect(timeAgoComponent.text()).toEqual('30 seconds ago');

        timeAgoComponent.setProps({ date: Date.now() - 10 * 1000 });

        expect(timeAgoComponent.text()).toEqual('10 seconds ago');
    });

    it('test componentWillUnmount', () => {
        timeAgo = <TimeAgo date={Date.now() - 30 * 1000} />;

        const timeAgoComponent = mount(timeAgo);
        const instance = timeAgoComponent.instance();

        expect(instance.timeAgoInstance).not.toBeNull();

        timeAgoComponent.unmount();

        expect(instance.timeAgoInstance).toBeNull();
    });
});
