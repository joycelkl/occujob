import authAxios from '../authAxios'

export const LOAD_SKILLS_SUCCESS_ACTION = 'LOAD_SKILLS_SUCCESS';

export const loadSkillsSuccessAction = (skills) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SKILLS_SUCCESS_ACTION,
            payload: skills
        })
    }
}

export const LOAD_SKILLS_FAIL_ACTION = 'LOAD_SKILLS_FAIL';

export const loadSkillsFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SKILLS_FAIL_ACTION
        })
    }
}
export const loadSkillsThunkAction = () => async(dispatch) => {
    console.log("Skills Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/public/skill').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadSkillsSuccessAction(res.data))
        }).catch(err => {
            console.log("Skills load err res", err.response)
            dispatch(loadSkillsFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}
