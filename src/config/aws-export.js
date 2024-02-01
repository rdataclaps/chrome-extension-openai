const awsmobile = {
    Auth: {
        region: process.env.REACT_APP_AUTH_REGION,
        userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
        cookieStorage: {
            domain: process.env.REACT_APP_DOMAIN_NAME,
            path: '/',
            expires: 1,
            sameSite: 'strict',
            secure: true
        },
        oauth: {
            domain: 'auth.docubark.com',
            scope: [
                'email',
                'openid',
                'profile'
            ],
            redirectSignIn: 'https://docubark.com/auth', // or localhost:3000
            redirectSignOut: 'https://docubark.com/login',
            responseType: 'code', // or 'token',
            federationTarget: 'COGNITO_USER_POOLS'
        },
    }
};

export default awsmobile;