import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '../utils/auth';
const root = () => import("../views/AppRoot")
const login = () => import("../views/Auth/Login")
const signup = () => import("../views/Auth/Signup")
const home = () => import("../views/Home/index")
const ReadTrip = () => import("../views/Trip/readTrip")
const ship = () => import("../views/Ship/index")
const ReadShip = () => import("../views/Ship/readShip")
const task = () => import("../views/Task/index")
const ReadTask = () => import("../views/Task/readTask")
const mytask = () => import("../views/Task/mytask")
const mytrip = () => import("../views/Trip/mytrip")
const myship = () => import("../views/Ship/myship")
const profile = () => import("../views/Profile/AppProfile")
const myaccount = () => import("../views/Profile/Myaccount")
const alltransection = () => import("../views/Profile/AllTransection")
const allnotifications = () => import("../views/Home/AllNotification")
const verify = () => import("../views/Auth/Verify")
const resendvlink = () => import("../views/Auth/resendvlink")
const forgotpassword = () => import("../views/Auth/Forgotpassword")
const resetpassword = () => import("../views/Auth/Resetpassword")

const billingpayment = () => import("../views/Profile/billingpayment")
const paymentmethods = () => import("../views/Profile/paymentmethods")
const billinginfo = () => import("../views/Profile/billinginfo")
const ewallet = () => import("../views/Profile/ewallet")

Vue.use(VueRouter)

const routes = [{
            path: '/',
            name: 'root',
            component: root,
            meta: { auth: false, guest: true }
        },
        { path: '/login', component: login, name: 'login', meta: { auth: false, guest: true } },
        { path: '/signup', component: signup, name: 'signup', meta: { auth: false, guest: true } },
        { path: '/trip', component: home, name: 'trip', meta: { auth: true, guest: false } },
        { path: '/trip/:slug', component: ReadTrip, name: 'ReadTrip', meta: { auth: true, guest: false } },
        { path: '/ship/:slug', component: ReadShip, name: 'ReadShip', meta: { auth: true, guest: false } },
        { path: '/ship', component: ship, name: 'ship', meta: { auth: true, guest: false } },
        { path: '/task', component: task, name: 'task', meta: { auth: true, guest: false } },
        { path: '/task/:slug', component: ReadTask, name: 'ReadTask', meta: { auth: true, guest: false } },
        { path: '/mytask', component: mytask, name: 'mytask', meta: { auth: true, guest: false } },
        { path: '/mytrip', component: mytrip, name: 'mytrip', meta: { auth: true, guest: false } },
        { path: '/myship', component: myship, name: 'myship', meta: { auth: true, guest: false } },
        { path: '/verification/verify/:id', component: verify, name: 'verify', meta: { auth: false, guest: true } },
        { path: '/resend-verification-link', component: resendvlink, name: 'resendvlink', meta: { auth: false, guest: true } },
        { path: '/forgot-password', component: forgotpassword, name: 'forgotpassword', meta: { auth: false, guest: true } },
        { path: '/password/reset/:token', component: resetpassword, name: 'resetpassword', meta: { auth: false, guest: true } },
        { path: '/alllnotifications', component: allnotifications, name: 'allnotifications', meta: { auth: true, guest: false } },
        {
            path: '/profile',
            component: profile,
            name: 'profile',
            meta: { auth: true, guest: false },
            children: [{
                path: 'alltransection',
                component: alltransection,
                name: 'alltransection'
            }, ]
        },
        {
            path: '/myaccount',
            component: myaccount,
            name: 'myaccount',
            meta: { account: true, auth: true, guest: false },
            children: [{
                    path: 'billings-payment',
                    component: billingpayment,
                    name: 'billingpayment',
                    meta: { auth: true, guest: false}
                },
                {
                    path: 'payment-methods',
                    component: paymentmethods,
                    name: 'paymentmethods',
                    meta: { auth: true, guest: false }

                },
                {
                    path: 'billing-information',
                    component: billinginfo,
                    name: 'billinginfo',
                    meta: { auth: true, guest: false }
                },
                {
                    path: 'e-wallet',
                    component: ewallet,
                    name: 'ewallet',
                    meta: { auth: true, guest: false }
                },
            ]
        },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const whiteList = ['/', '/login', '/register', '/verification/verify/:id'];
router.beforeEach(async (to, from, next) => {
    // determine whether the user has logged in
    const hasToken = getToken();
    const noToken = !!getToken();
    if (to.meta.auth) {
        if (hasToken) {
            next()
        } else {
            next('/');
        }

    }
    if (to.meta.account) {
       router.push({ name: 'billingpayment' });
    }
    if (to.meta.guest) {
        if (noToken == false) {
            next()
        }
    }
});

export default router