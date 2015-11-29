Template.MainLayout.helpers({
    loggedIn: function () {
        if (typeof(Storage) === "undefined") {
            console.log('local storage not supported, not gonna care for this project')
            return false
        }

        return Boolean(localStorage.getItem(KEY_CURRENT_USER));
    },
    currentUser: function () {
        return localStorage.getItem(KEY_CURRENT_USER)
    }
});