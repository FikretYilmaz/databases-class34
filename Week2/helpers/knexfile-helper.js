const showTasks = `SELECT * from tasks
WHERE done_at > NOW();`;
module.exports.showTasks = showTasks;
