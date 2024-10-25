const initialState = {
    value: false,
}

const uploadReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'SHOW':{
            const newState = action.payload;

            return {
                ...state,
                value: newState,
            };
        }
        case 'HIDE':{
            const newState = action.payload;

            return {
                ...state,
                value: newState,
            };
        }
        default:
            return state;
    }
}
export default uploadReducer