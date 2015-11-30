// Data is read from select statements published by server
Meteor.startup(function () {
    liveDb = new LiveMysql({
        host: 'localhost',
        port: 3407,
        user: 'root',
        password: '',
        database: 'bookstore'
    });

    closeAndExit = function () {
        liveDb.end();
        process.exit();
    };
// Close connections on hot code push
    process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
    process.on('SIGINT', closeAndExit);
});