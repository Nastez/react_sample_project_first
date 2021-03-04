import React from "react"
import {actions} from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"

export let mapStateToProps = (state)  => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {dispatch(actions.addMessageActionCreator(newMessageBody))}
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
