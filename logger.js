const log4js = require("log4js")
const level = process.env.NODE_LOGGING_LEVEL || "info"

const logger = (filename) => {
    return log4js.configure({
        appenders: {
          app:{type: "file", filename: filename },
          out: {type: 'stdout'},
              },
        categories: {
            default: {
                appenders: ["app", "out"],
                level: level
                }
            }
    })
}

global.__basedir = __dirname
const logFile = `/log/app.log`
const logPath = `${__basedir}/${logFile}`
const log = logger(logPath).getLogger("app");
module.exports = log;


// log4js.configure({
//     appenders: {
//         app:{type: "file", filename: "log/app.log"},
//         out: {type: 'stdout'},
       
//     },
//     categories: {
//         default: {
//             appenders: ["app", "out"],
//             level: level
//         }
//     }
// });


// const logger = log4js.getLogger("log/app.log")

//logger.info("Cheese is Comté.");

// Object.defineProperty(exports, "LOG", {
//     value:logger,
// });



