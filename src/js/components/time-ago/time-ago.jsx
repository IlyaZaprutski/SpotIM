import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import timeAgo from 'timeago.js';

const LOCALE = 'en';

export default class TimeAgo extends React.PureComponent {
    static propTypes = {
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)])
            .isRequired,
        isLiveUpdate: PropTypes.bool,
        classNames: PropTypes.string,
    };

    static defaultProps = {
        isLiveUpdate: true,
        classNames: '',
    };

    constructor(props) {
        super(props);
        this.timeAgoInstance = timeAgo();
    }

    componentDidMount() {
        this.renderTimeAgo();
    }

    componentDidUpdate() {
        this.renderTimeAgo();
    }

    componentWillUnmount() {
        timeAgo.cancel(this.timeNode);
        this.timeAgoInstance = null;
    }

    renderTimeAgo() {
        const { isLiveUpdate, date } = this.props;
        const { timeAgoInstance, timeNode } = this;

        timeAgo.cancel(timeNode);

        if (isLiveUpdate) {
            const dateLabel = date instanceof Date ? date.getTime() : date;

            timeNode.setAttribute('datetime', dateLabel);

            timeAgoInstance.render(this.timeNode, LOCALE);
        }
    }

    render() {
        const { date, classNames } = this.props;

        const timeAgoClassNames = classnames('time-ago', classNames);

        return (
            <time
                className={timeAgoClassNames}
                ref={(timeNode) => {
                    this.timeNode = timeNode;
                }}
            >
                {this.timeAgoInstance.format(date, LOCALE)}
            </time>
        );
    }
}
