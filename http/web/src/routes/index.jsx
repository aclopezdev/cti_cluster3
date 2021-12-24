import Login from "../app/auth/login";
import SignUp from "../app/auth/signup";
import Main_view from "../app/view";

export const PATHS =
{
    MAIN: '/',
    LOGIN: '/login',
    SIGNUP: '/signup'
}

export const routes = 
{
    main: {
        href: PATHS.MAIN,
        comp: Main_view
    },
    login: {
        href: PATHS.LOGIN,
        comp: Login
    },
    signup: {
        href: PATHS.SIGNUP,
        comp: SignUp
    }
}