export const updateEEProfileAction = (name, intro, phone, expectedSalary, industry, available, location, image, exp, skill) => async(dispatch) => {
  console.log("EE Profile update")
  try {
      const authAxiosConfig = await authAxios();
      await authAxiosConfig.post('/employee/profile', {
          name: name,
          industry: industry,
          intro: intro,
          expectedSalary: expectedSalary,
          phone: phone,
          availability: available,
          location: location,
          image: image,
          exp: exp,
          skill: skill
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