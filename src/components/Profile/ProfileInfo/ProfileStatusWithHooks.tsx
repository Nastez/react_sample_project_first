import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getStatusSelector} from '../../../redux/profile-selectors'
import {updateStatus} from '../../../redux/profile-reducer'

const ProfileStatusWithHooks: React.FC = (props) => {

    const statusSelector = useSelector(getStatusSelector)

    const dispatch = useDispatch()

    let [editMode, setEditMode] = useState(false) // здесь сидит массив, из которого мы достаем первый элемент и присваем editMode, достаем второй элементи присваем setEditMode
    let [status, setStatus] = useState(statusSelector)

    useEffect(() => {
        setStatus(statusSelector)
    }, [statusSelector])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <b>Status</b>: <span onDoubleClick={activateEditMode}>{statusSelector || '-----'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks