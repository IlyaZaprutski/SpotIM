const shouldHandleAction = (action, prefix) => {
    if (!action || !action.type) {
        return false;
    }

    return action.type.slice(0, prefix.length) === prefix;
};

const defaultActionHandler = (eventName, action, emit, next) => {
    emit(eventName, action);
    return next(action);
};

export default (
    socket,
    actionPrefix,
    eventName,
    socketAction,
    actionHandler = defaultActionHandler,
) => {
    const emitBound = socket.emit.bind(socket);

    return ({ dispatch }) => {
        socket.on(eventName, (payload) => {
            dispatch(socketAction(payload));
        });

        return next => (action) => {
            if (shouldHandleAction(action, actionPrefix)) {
                return actionHandler(eventName, action, emitBound, next, dispatch);
            }
            return next(action);
        };
    };
};
