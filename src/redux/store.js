import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer";

/**this "composeEnhancers" function and imported "compose" function, just for adding redux devTolls to our app*
 * but you should also install the redux devTools for your browser from the "chrome store", follow th link
 * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
 */
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

export default function initStore() {
    return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}
