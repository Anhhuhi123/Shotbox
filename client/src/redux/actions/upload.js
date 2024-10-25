export const showUpload = (state) => {
    return{
        type:'SHOW',
        payload: state,
    }
}

export const hideUpload = (state) => {
    return{
        type:'HIDE',
        payload: state,
    }
}