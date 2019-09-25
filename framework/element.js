// const div = (strings, ...args) =>{
//     let acc = "";
//     for(const currentString of strings) {
//         const interpolatedString = (args[index] || ""):
//         acc += currentString + interpolatedString;
//     }
//     return acc;
// };
// const div = (strings, ...args)=>
//     strings.reduce(
//         (acc, currentString, index) => acc + currentString + (args[index] || ""),
//         ""
//     );
import h from "snabbdom/h";

const initialState = {
    template: "",
    on: {}
};

const createReducer = args => (acc, currentString, index) => {
    const currentArg = args[index];
    if( currentArg && currentArg.type === "event"){
        return { ...acc, on: {click: currentArg.click}};
    }
    return {
        ...acc,
        template: acc.template + currentString + (args[index] ||"")
    };
};

const createElement = tagName => (strings, ...args) => {
    const { template } = strings.reduce(createReducer(args), initialState);

    return {
        type: "element",
        template: h(tagName, { on }, template)
    };
};

// const createElement = tagName => (strings, ...args) => ({
//     type: "element",
//     template: h(
//         tagName,
//         {},
//         strings.reduce(
//             (acc, currentString, index) => acc + currentString + (args[index] || ""),
//             ""
//         )
//     )
// });

// const createElement = tagName => (string, ...args) => ({
//     type: tagName,
//     template: string.reduce(
//         (acc, currentString, index) => acc + currentString + (args[index] || ""),
//     )
// });

export const div = createElement('div');
export const p = createElement("p");

const firstName = "Marvin";
const lastName = "Franchet";

// const { template } = p`Hello ${firstName} ${lastName} !`;
// console.log(template);
//
// div`Hello ${firstName} ${lastName} !`;










