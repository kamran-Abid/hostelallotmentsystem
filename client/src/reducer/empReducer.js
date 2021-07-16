export const initialState_emp = null;
export const reducer_emp = (state_emp, action) => {
    if (action.type === "EMP") {
        return action.payload;
    }
    return state_emp;
}