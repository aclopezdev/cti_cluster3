import { createStore } from "redux";
import Reducer from "../reducers";

const Store = createStore(Reducer);
Store.subscribe(() => {
    console.log(Store);
});

export default Store;