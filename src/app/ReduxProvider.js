"use client"

import { Provider } from "react-redux";
import store from "./../store/store";
import IndexComponent from ".";
import Toast from "./common/toast/toast";


export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <IndexComponent>
                {children}
            </IndexComponent>
            <Toast />
        </Provider>
    );
}
