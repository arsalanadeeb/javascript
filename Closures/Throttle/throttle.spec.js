const throttle = require('./throttle');

describe("throttle function", () => {
    jest.useFakeTimers();
  
    let mockFunction;
    let throttledFunction;
  
    beforeEach(() => {
      mockFunction = jest.fn();
      throttledFunction = throttle(mockFunction, 1000); // throttle with a 1-second wait
    });
  
    afterEach(() => {
      jest.clearAllTimers();
    });
  
    test("should call the function immediately on the first call", () => {
      throttledFunction("first");
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith("first");
    });
  
    test("should not call the function again within the wait period", () => {
      throttledFunction("first");
      throttledFunction("second");
  
      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith("first");
    });
  
    test("should call the function again after the wait period if no cached arguments exist", () => {
      throttledFunction("first");
  
      jest.advanceTimersByTime(1000);
  
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  
    test("should call the function with cached arguments after the wait period", () => {
      throttledFunction("first");
      throttledFunction("second");
  
      jest.advanceTimersByTime(1000);
  
      expect(mockFunction).toHaveBeenCalledTimes(2);
      expect(mockFunction).toHaveBeenCalledWith("second");
    });
  
    test("should handle multiple calls properly within multiple wait periods", () => {
      throttledFunction("first");
      throttledFunction("second");
      jest.advanceTimersByTime(1000);
  
      throttledFunction("third");
      throttledFunction("fourth");
      jest.advanceTimersByTime(1000);
  
      expect(mockFunction).toHaveBeenCalledTimes(4);
      expect(mockFunction.mock.calls).toEqual([
        ["first"],
        ["second"],
        ["third"],
        ["fourth"],
      ]);
    });
  
    test("should reset the cache and timer after execution", () => {
      throttledFunction("first");
      throttledFunction("second");
  
      jest.advanceTimersByTime(1000);
      throttledFunction("third");
  
      expect(mockFunction).toHaveBeenCalledTimes(3);
      expect(mockFunction.mock.calls).toEqual([
        ["first"],
        ["second"],
        ["third"],
      ]);
    });
  });