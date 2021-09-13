import authAxios from '../../Redux/authAxios'

export const LOAD_EE_PROFILE_SUCCESS_ACTION = 'LOAD_EE_PROFILE_SUCCESS';

export const loadEEProfileSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EE_PROFILE_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_EE_PROFILE_FAIL_ACTION = 'LOAD_EE_PROFILE_FAIL';

export const loadEEProfileFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EE_PROFILE_FAIL_ACTION
        })
    }
}

//Load Profile for EE page
export const loadEEProfileThunkAction = () => async(dispatch) => {
    console.log("public Profile Loaded")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/profile').then(res => {
            console.log('res.data', res.data)
            dispatch(loadEEProfileSuccessAction(res.data[0]))
        }).catch(err => {
            console.log("EE Profile load err res", err.response)
            dispatch(loadEEProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

export const updateEEProfileAction = (name, intro, phone, expectedSalary, industry, availability, location, image, exp, skill, salaryType) => async(dispatch) => {
    console.log("EE Profile update")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/profile', {
            name: name,
            intro: intro,
            phone: phone,
            expectedSalary: expectedSalary,
            industry: industry,
            availability: availability,
            location: location,
            image: image,
            exp: exp,
            skill: skill,
            salaryType: salaryType
        }).then(res => {
            dispatch(loadEEProfileSuccessAction(res.data))
        }).catch(err => {
            console.log("Update fail err res", err.response)
            dispatch(loadEEProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}