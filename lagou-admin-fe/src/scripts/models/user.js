const sign = ({url, data}) => {
  return $.ajax({
    url,
    data,
    type: 'POST',
    success: (result) => {
      return result
    }
  })
}

const isSignin = () => {
  return $.ajax({
    url: '/api/user/isSignin',
    success: (result) => {
      return result
    }
  })
}

const signout = () => {
  return $.ajax({
    url: '/api/user/signout',
    dataType: 'json',
    success: (result) => {
      return result
    }
  })
}

export default {
  sign,
  isSignin,
  signout
}