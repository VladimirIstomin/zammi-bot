// telegram API could be called only 30 times in a second, so to make a mailing we need to wait about 40ms between each mail
exports.telegramAPITimer = () => new Promise(res => setTimeout(res, 40));
