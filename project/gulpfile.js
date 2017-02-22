/**
 * Gulp 工作流配置文件 By Fannie Shi
 */
var dev = require('../_tasks/gulpfile.dev.js');
var dist = require('../_tasks/gulpfile.dist.js');
dev();
dist();