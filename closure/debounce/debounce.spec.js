// debounce.spec.js
const debounce = require('./debounce');

jest.useFakeTimers();

describe('debounce', () => {
    let mockFunction;

    beforeEach(() => {
        mockFunction = jest.fn();
    });

    test('executes the function after the specified delay', () => {
        const debouncedFn = debounce(mockFunction, 1000);

        debouncedFn('test1');
        expect(mockFunction).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1000);
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(mockFunction).toHaveBeenCalledWith('test1');
    });

    test('resets the timer on consecutive calls', () => {
        const debouncedFn = debounce(mockFunction, 1000);

        debouncedFn('test1');
        jest.advanceTimersByTime(500);
        debouncedFn('test2');

        jest.advanceTimersByTime(500);
        expect(mockFunction).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(mockFunction).toHaveBeenCalledWith('test2');
    });

    test('executes only the last call in rapid succession', () => {
        const debouncedFn = debounce(mockFunction, 1000);

        debouncedFn('call1');
        debouncedFn('call2');
        debouncedFn('call3');

        jest.advanceTimersByTime(1000);
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(mockFunction).toHaveBeenCalledWith('call3');
    });
    test('maintains the correct `this` context', () => {
        const obj = {
            value: 42,
            debouncedLog: debounce(function () {
                mockFunction(this.value); // Mock the console.log for testing
            }, 1000),
        };

        obj.debouncedLog();

        jest.advanceTimersByTime(1000);
        expect(mockFunction).toHaveBeenCalledTimes(1);
        expect(mockFunction).toHaveBeenCalledWith(42);
    });
});
