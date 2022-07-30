const dispatcher = (function () {
  var store = null;
  return {
    setStore: (obj) => (store = obj),
    dispatch: (action) => store.dispatch(action),
  };
})();

const dispatch = (action) =>
  Promise.resolve().then(() => dispatcher.dispatch(action));

export const dispatchEndpoint = (action) =>
  Promise.resolve().then(() => dispatcher.dispatch(action.initiate()));

export const { setStore } = dispatcher;
export default dispatch;
