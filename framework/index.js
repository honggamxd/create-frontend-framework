import * as snabbdom from "snabbdom";
const patch = snabbdom.init([
    require("snabbdom/modules/eventlisteners").default
]);

export const init = (selector, component) => {
    const app = document.querySelector(selector);
    patch(app, component.template);
};

let state = {};

export const createComponent = ({
    template,
    methods ={},
    initialState = {}
}) => {
    state = initialState;
    let previous;

    const mappedMethods = props =>
        Object.key(methods).reduce(
        (acc, key) => ({
            ...acc,
            [key]: (...args) => {
                state = methods[key](state, ...args);
                const nextNode = template({
                    ...props,
                    ...state,
                    methods: mappedMethods(props)
                });
                patch(previous.template, nextNode.template);
                previous = nextNode;
                // console.log(state);
                return state;
            }
        }),
        {}
    );
    return props => template({ ...props, ...state, methods: mappedMethods});
};
// export const init = (selector, component) => {
//     const app = document.querySelector(selector);
//     const newElement = document.createElement(component.type);
//     const newTextContent = document.createTextNode(component.template);
//
//     newElement.append(newTextContent);
//     app.append(newElement);
// };

import { init } from "./framework";
import { User } from "./src/user";

const firstName = "Marvin";
const lastName = "Frachet";

init("#app", User({ firstName, lastName}));

// import { init } from "./framework";
// import { div } from "./framework/element";
// import { User } from "./src/user";
//
//
// const firstName = "Marvin";
// const lastName = "Frachet";
//
// // init("#app", User({ firstName, lastName}));
//
// init("#app", div`Hello ${firstName} ${lastName}`);
// console.log(div`Hello ${firstName} ${lastName} !`);


