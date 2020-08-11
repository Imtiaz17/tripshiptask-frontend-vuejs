import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '../utils/auth';
import store from '../store/index'


const root = () => import("../views/AppRoot")
const dashboard = () => import("../views/Dashboard")
const signup = () => import("../views/Auth/Signup")
const category = () => import("../views/Home/Category")
const skill = () => import("../views/Home/Skill")
const home = () => import("../views/Home/index")
const ReadTrip = () => import("../views/Trip/readTrip")
const ship = () => import("../views/Ship/index")
const ReadShip = () => import("../views/Ship/readShip")
const task = () => import("../views/Task/index")
const ReadTask = () => import("../views/Task/readTask")
const mytask = () => import("../views/Task/mytask")
const mytrip = () => import("../views/Trip/mytrip")
const mytripoffers = () => import("../views/Trip/myOffers")
const myship = () => import("../views/Ship/myship")
const myshipoffers = () => import("../views/Ship/myOffers")
const mytaskoffers = () => import("../views/Task/myOffers")
const profile = () => import("../views/Profile/AppProfile")
const myaccount = () => import("../views/Profile/Myaccount")
const referral = () => import("../views/Panel/referral")
const alltransection = () => import("../views/Profile/AllTransection")
const allnotifications = () => import("../views/Home/AllNotification")
const verify = () => import("../views/Auth/Verify")
const employeesignup = () => import("../views/Auth/employeesignup")
const forgotpassword = () => import("../views/Auth/Forgotpassword")
const resetpassword = () => import("../views/Auth/Resetpassword")

const mytransactions = () => import("../views/Profile/mytransactions")
const paymentmethods = () => import("../views/Profile/paymentmethods")
const billinginfo = () => import("../views/Profile/billinginfo")
const ewallet = () => import("../views/Profile/ewallet")


const faq = () => import("../views/Pages/Faq")
const privacyp = () => import("../views/Pages/PrivacyPolicy")
const datap = () => import("../views/Pages/DataPolicy")
const cookiep = () => import("../views/Pages/CookiePolicy")
const termsc = () => import("../views/Pages/TermsCondition")
const refersomeone = () => import("../views/Pages/Referrals")


const PageNotFound = () => import("../views/Home/PageNotFound")

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'root',
        component: root,
        meta: { auth: false, guest: true }
    },
    { path: '/dashboard', component: dashboard, name: 'dashboard', meta: { auth: true, guest: false } },
    { path: '/category', component: category, name: 'category', meta: { auth: true, guest: false } },
    { path: '/skill', component: skill, name: 'skill', meta: { auth: true, guest: false } },
    { path: '/signup', component: signup, name: 'signup', meta: { auth: false, guest: true } },
    { path: '/trip', component: home, name: 'trip', meta: { auth: true, guest: false } },
    { path: '/trip/:slug', component: ReadTrip, name: 'ReadTrip', meta: { auth: true, guest: false } },
    { path: '/ship/:slug', component: ReadShip, name: 'ReadShip', meta: { auth: true, guest: false } },
    { path: '/ship', component: ship, name: 'ship', meta: { auth: true, guest: false } },
    { path: '/task', component: task, name: 'task', meta: { auth: true, guest: false } },
    { path: '/task/:slug', component: ReadTask, name: 'ReadTask', meta: { auth: true, guest: false } },
    { path: '/mytask', component: mytask, name: 'mytask', meta: { auth: true, guest: false } },
    { path: '/mytrip', component: mytrip, name: 'mytrip', meta: { auth: true, guest: false } },
    { path: '/my-trip-offers', component: mytripoffers, name: 'mytripoffers', meta: { auth: true, guest: false } },
    { path: '/my-ship-offers', component: myshipoffers, name: 'myshipoffers', meta: { auth: true, guest: false } },
    { path: '/my-task-offers', component: mytaskoffers, name: 'mytaskoffers', meta: { auth: true, guest: false } },
    { path: '/myship', component: myship, name: 'myship', meta: { auth: true, guest: false } },
    { path: '/referral', component: referral, name: 'referral', meta: { auth: true, guest: false } },
    { path: '/verify/:id', component: verify, name: 'verify', meta: { auth: false, guest: true } },
    { path: '/employeeinfo/:id', component: employeesignup, name: 'employeesignup', meta: { auth: false, guest: true } },
    { path: '/forgot-password', component: forgotpassword, name: 'forgotpassword', meta: { auth: false, guest: true } },
    { path: '/password/reset/:token', component: resetpassword, name: 'resetpassword', meta: { auth: false, guest: true } },
    { path: '/alllnotifications', component: allnotifications, name: 'allnotifications', meta: { auth: true, guest: false } },
    { path: '/my-transactions', component: mytransactions, name: 'mytransactions', meta: { auth: true, guest: false } },
    { path: '/payment-methods', component: paymentmethods, name: 'paymentmethods', meta: { auth: true, guest: false } },
    { path: '/e-wallet', component: ewallet, name: 'ewallet', meta: { auth: true, guest: false } },
    {
        path: '/profile',
        component: profile,
        name: 'profile',
        meta: { auth: true, guest: false },
        redirect: '/profile/general-info',
        children: [{
                path: 'nid-info',
                component: () => import('@/views/Profile/NidInfo'),
                name: 'nidinfo',
                meta: { auth: true, guest: false },
            },
            {
                path: 'vehicle-info',
                component: () => import('@/views/Profile/VehicleInfo'),
                name: 'vehicleinfo',
                meta: { auth: true, guest: false },
            },
            {
                path: 'general-info',
                component: () => import('@/views/Profile/GeneralInfo'),
                name: 'generalinfo',
                meta: { auth: true, guest: false },
            },
            {
                path: 'change-password',
                component: () => import('@/views/Profile/ChangePassword'),
                name: 'changepassword',
                meta: { auth: true, guest: false },
            },
        ],
    },
    { path: "/faq", component: faq, name: 'faq' },
    { path: "/terms-condition", component: termsc, name: 'termsc' },
    { path: "/privacy-policy", component: privacyp, name: 'privacyp' },
    { path: "/data-policy", component: datap, name: 'datap' },
    { path: "/cookie-policy", component: cookiep, name: 'cookiep' },
    { path: "/refer-someone", component: refersomeone, name: 'refersomeone' },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const whiteList = ['/', '/signup', '/forgot-password'];
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
    if (to.meta.guest) {
        if (noToken == false) {
            next()
        }
    }
    if (hasToken) {
        if (to.path == '/signup' || to.path == '/') {
            // if is logged in, redirect to the home page
            router.push({ name: 'dashboard' });
        }
        if (store.state['user'] == null) {
            await store.dispatch('getInfo');
        }
        if (store.getters.user.status=='unverified') {
            if (to.path !== '/dashboard')
            {
                router.push('/dashboard');
            }
        }
        next();
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            next();
        }
    }
});

export default router