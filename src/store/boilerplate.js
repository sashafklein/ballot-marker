/* eslint no-underscore-dangle:0 */

const reducerObjFromHandlerWrapper = handlers => handlerName => {
  const handler = handlers[handlerName];
  const initState = handler._init;

  delete handler._init;

  const reducerFunc = (state = initState, action) => (
    handler[action.type]
      ? handler[action.type](state, action)
      : state
  );

  return { [handlerName]: reducerFunc };
};

export const constructReducers = (handlers, otherReducers = {}) => {
  const reducerObjFromHandler = reducerObjFromHandlerWrapper(handlers);
  const reducers = Object.keys(handlers)
    .reduce((obj, name) => Object.assign(
      obj, reducerObjFromHandler(name)),
    {});

  Object.keys(otherReducers).forEach(key => {
    reducers[key] = otherReducers[key];
  });

  return reducers;
};
