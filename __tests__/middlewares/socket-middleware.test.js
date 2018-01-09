import { SocketIO, Server } from 'mock-socket';

import socketMiddleware from '../../src/js/middlewares/socket-middleware';

const create = (actionHandler) => {
    const store = {
        dispatch: jest.fn(),
    };
    const next = jest.fn();

    const socketAction = jest.fn();

    const socket = new SocketIO('http://localhost:8080');

    const middleware = socketMiddleware(socket, 'PREFIX_', 'send', socketAction, actionHandler);

    const invoke = action => middleware(store)(next)(action);

    return {
        store,
        next,
        invoke,
        socketAction,
    };
};

describe('Socket middleware', () => {
    let mockServer = null;

    beforeAll(() => {
        mockServer = new Server('http://localhost:8080');

        mockServer.on('send', (payload) => {
            mockServer.emit('send', payload);
        });
    });

    afterAll(() => {
        mockServer.stop();
    });

    it('should ignore middleware', () => {
        const { next, invoke, socketAction } = create(jest.fn());
        const action = { type: 'test', payload: {} };

        invoke(action);
        expect(next).toHaveBeenCalledWith(action);
        expect(socketAction).not.toHaveBeenCalled();

        invoke({});
        expect(next).toHaveBeenCalledWith({});
        expect(socketAction).not.toHaveBeenCalled();
    });

    it('should call actionHandler', () => {
        const actionHandler = jest.fn();
        const { invoke } = create(actionHandler);
        const action = { type: 'PREFIX_test', payload: {} };

        invoke(action);
        expect(actionHandler).toHaveBeenCalled();
    });

    it('should call default actionHandler', async () => {
        const { invoke, socketAction } = create();
        const action = { type: 'PREFIX_test', payload: { test: 'test' } };

        await new Promise(resolve => setTimeout(resolve, 3000));

        invoke(action);
        expect(socketAction).toHaveBeenCalled();
    });
});
