INITAL_STATE = {
    currentUser = null
}


const userReducer = (state=INITAL_STATE.currentUser, action) => {
    switch(action.type){
        case'SET_CURRENT_USER':
        return{
            ...state,
            currentUser: action.payload
        }
    }
};
