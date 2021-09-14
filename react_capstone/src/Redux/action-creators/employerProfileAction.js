import authAxios from '../authAxios'

export const LOAD_ER_PROFILE_SUCCESS_ACTION = 'LOAD_ER_PROFILE_SUCCESS';

export const loadErProfileSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ER_PROFILE_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_ER_PROFILE_FAIL_ACTION = 'LOAD_ER_PROFILE_FAIL';

export const loadErProfileFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ER_PROFILE_FAIL_ACTION
        })
    }
}

//Load Job for ER Profile in Employer side
export const loadErProfileThunkAction = () => async(dispatch) => {
    console.log("ER Profile Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/profile').then(res => {
            dispatch(loadErProfileSuccessAction(res.data[0]))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadErProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


export const UPDATE_ER_PROFILE_ACTION = 'UPDATE_ER_PROFILE';

export const updateErProfileAction = (industry, compDescription, phone, location, image) => async(dispatch) => {
    console.log("ER Profile update")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employer/profile', {
            industry: industry,
            compDescription: compDescription,
            phone: phone,
            location: location,
            image: image
        }).then(res => {
            dispatch(loadErProfileSuccessAction(res.data))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadErProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

//Load Job for ER Profile for applicant
export const loadErProfileforAppThunkAction = (er_id) => async(dispatch) => {
    console.log("ER Profile in applicant side Load", er_id)
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employee/employerDetail/${er_id}`).then(res => {
            dispatch(loadErProfileSuccessAction(res.data[0]))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadErProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}