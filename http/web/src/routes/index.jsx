import Login from "../app/auth/login";
import SignUp from "../app/auth/signup";
import Main_view from "../app/view";

export const SCOPE =
{
    PUBLIC: 'public',
    PRIVATE: 'private'
}

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
        comp: Main_view,
        scope: SCOPE.PUBLIC
    },
    login: {
        href: PATHS.LOGIN,
        comp: Login,
        scope: SCOPE.PUBLIC
    },
    signup: {
        href: PATHS.SIGNUP,
        comp: SignUp,
        scope: SCOPE.PUBLIC
    }
}