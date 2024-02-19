'use server'
interface LoginData {
    username: string;
    password: string;
    randomStr: string;
    code: string;
    scope: string;
    grant_type: string;
}

export async function getToken(loginData: LoginData) {
    const params = new URLSearchParams({
        username: loginData.username,
        randomStr: loginData.randomStr,
        code: loginData.code,
        scope: loginData.scope,
        grant_type: loginData.grant_type
    }).toString();
    const data = new URLSearchParams({ password: loginData.password }).toString()
    console.log(params, data)


    const response = await fetch(
        `http://127.0.0.1:9999/auth/oauth2/token?${params}`,
        {
            method: "POST",
            headers: {
                "skipToken": "true",
                Authorization:
                    "Basic " +
                    btoa('pig:pig'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data,
        },
    );
    const resData =  await response.json();
    console.log(resData)
    return resData
}