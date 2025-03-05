import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateBalance,
    updateUserDetails,
    updateUserActivities
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

// eslint-disable-next-line no-unused-vars
function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname, balance, activities,backgroundColor,color }) {
    const user = { username, password, fullname, balance, activities,backgroundColor, color }
    user.createdAt = user.updatedAt = Date.now()

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance:user.balance , activities: user.activities, backgroundColor: user.backgroundColor, color: user.color }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
        balance: 0,
        activities: [],
        backgroundColor:'#000000',
        color:'#ffffff'
    }
}

function updateBalance() {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            user.balance += 10
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.balance
        })
}


function updateUserDetails(newUserDetails) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (!user) throw new Error("User not found");

            const updatedUser = {
                ...user,
                fullname: newUserDetails.fullname,
                color: newUserDetails.color,
                backgroundColor: newUserDetails.backgroundColor
            };

            return storageService.put(STORAGE_KEY, updatedUser);
        })
        .then(updatedUser => {
            _setLoggedinUser(updatedUser);
            return updatedUser;
        })
        .catch(error => {
            console.log("Failed to update user details:", error);
            throw error; // Re-throw for handling at the caller level
        });
}


function updateUserActivities(newActivity) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (!user) throw new Error("User not found");

            const updatedUser = {
                ...user,
                activities: [
                    newActivity,
                    ...(user.activities || []),
                ],
            };

            return storageService.put(STORAGE_KEY, updatedUser);
        })
        .then(updatedUser => {
            _setLoggedinUser(updatedUser);
            return updatedUser;
        })
        .catch(error => {
            console.log("Failed to update user activities:", error);
            throw error; // Re-throw for handling at the caller level
        });
}


// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }