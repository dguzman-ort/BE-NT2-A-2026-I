const AUTH_KEY = '@auth_data'
const login = async (email, password) => {
    // const response = await fetch('http://localhost:8787/api/v1/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldLogin = email.trim() === 'test@test.com' && password.trim() === '123456'
            if (shouldLogin) {
                resolve({
                    access_token: '1234567890',
                    refresh_token: '1234567890',
                    expires_in: 3600,
                    user: {
                        id: '1234567890',
                        name: 'Test User',
                        email: 'test@test.com',
                    },
                })
            } else {    
                reject({
                    error: 'Invalid email or password',
                })
            }
        }, 1000)
    })
}

export default { login, AUTH_KEY }