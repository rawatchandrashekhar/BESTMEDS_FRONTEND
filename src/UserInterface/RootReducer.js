var initialState = {
    cart: {},
    user: {},
    da:   {}
}

export default function RootReducer(state = initialState, action) {
    console.log("ACTION", action)
    switch (action.type) {

        case "ADD_DA":
            state.da[action.payload[0]] = action.payload[1]
            return { cart: state.cart, user: state.user,da:state.da }

        case "ADD_USER":
            state.user[action.payload[0]] = action.payload[1]
            return { cart: state.cart, user: state.user,da:state.da }

        case "ADD_ITEM":
            state.cart[action.payload[0]] = action.payload[1]
            return { cart: state.cart, user: state.user,da:state.da }

        case "REMOVE_ITEM":
            delete state.cart[action.payload[0]]
            return { cart: state.cart, user: state.user ,da:state.da }

        default:
            return state
    }
}