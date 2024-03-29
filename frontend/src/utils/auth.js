export const BASE_URL = 'https://api.mesto.iigorevich.nomoredomains.work';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

    .then((res) => {
      if (!res.ok) {
        throw new Error('Register Error');
      }
      return res.json()
    })
}



export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })

    })

    .then((res) => {
      if (!res.ok) {
        throw new Error('Authorization Error');
      }
      return res.json()
    })

    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token)
        console.log(data)
        return data
      }
    })
}




export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

   .then((res) => {
      if (!res.ok) {
        throw new Error('Problem with token');
      }
      return res.json()
    })

}


export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then((res) => {
    
    if (!res.ok) {
      throw new Error('Logout Error');
    }

    return res.json();
  });
};