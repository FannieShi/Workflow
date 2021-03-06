#### 项目目录结构

````bash
workflow/
├── _tasks
|   ├── gulpfile.config.js                 //Gulp 配置各文件夹及其对应目录
|   ├── gulpfile.dev.js                    //Gulp 配置开发环境下任务及浏览器自动刷新
|   └── gulpfile.dist.js                   //Gulp 配置生产环境下任务
|
├── package.json                           //记录项目所需的依赖，可通过 npm install 下载依赖
|
└── project/                               //项目目录
    ├── gulpfile.js                        //Gulp 工作流配置文件
    |
    ├── src                                //源文件目录
    |   ├── css                            //存放Less、Sass文件的目录, `gulp build_dev`阶段会监听此目录下的文件变动
    |   ├── js                             //存放未压缩的js
    |   ├── plugins                        //存放插件文件夹
    |   ├── media                          //存放媒体文件
    |   ├── img                            //存放背景图等无需合并雪碧图处理的图片
    |   ├── sprite                         //切片图片素材，将会进行雪碧图合并
    |   └── *.html
    |
    ├── dev                                //开发目录, 由 `gulp build_dev` 任务生成
    |   ├── css                            //Sass/Less -> CSS
    |   ├── js                             
    |   ├── plugins  
    |   ├── media
    |   ├── img
    |   ├── sprite                         //开发阶段，仅从src/sprite 拷贝至此，不做合并雪碧图处理
    |   └── *.html                       
    |
    └── dist                               //生产目录, 由 `gulp build_dist` 任务生成
        ├── css                            
        ├── js                             
        ├── plugins 
        ├── media
        ├── img
        ├── sprite                         //将src/sprite 合并雪碧图
        └── *.html 
        
        