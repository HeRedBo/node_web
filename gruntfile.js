// module.exports = function(grunt) {
//      grunt.initConfig({
//         concurrent: {
//             tasks : ['nodemon','watch'],
//             options: {
//                 logConcurrentOutput: true
//             }
//         },
//         watch : {
//             jade : {
//                 files : ['views/**'],
//                 options : {
//                     livereload : true
//                 }
//             },
//             js : {
//                 files : ['public/javascripts/**','models/**/*.js','schemas/**/*.js']
//                 //tasks : ['jshint'],
//                 options : {
//                     livereload : true
//                 }
//             }
//         },
//         nodemon: {
//           dev: {
//             script: 'app.js',
//             options: {
//               args: ['dev'],
//               nodeArgs: ['--debug'],
//               callback: function (nodemon) {
//                 nodemon.on('log', function (event) {
//                   console.log(event.colour);
//                 });
//               },
//               env: {
//                 PORT: '8181'
//               },
//               cwd: __dirname,
//               ignore: ['node_modules/**','README.md','.DS_Store'],
//               ext: 'js,coffee',
//               watch: ['./'],
//               delay: 1000,
//               legacyWatch: true
//             }
//           },
//         }
//     });

//     grunt.loadNpmTasks('grunt-contrib-watch');
//     grunt.loadNpmTasks('grunt-nodemon');
//     grunt.loadNpmTasks('grunt-concurrent');
//     grunt.option('force', true);
//     grunt.registerTask('default', ['concurrent']);
// };


module.exports=function(grunt){//wrap函数
    grunt.initConfig({
        watch:{
            jade:{
                files:["views/**"],
                options:{
                livereload:true  //如果grunt端口号冲突的话，就把true改为和nodemon的port不一样的值
                }
            },
            js:{
                files:["public/js/**","models/**/*.js","schemas/**/*.js"],
                //tasks:["jshint"],
                options:{
                livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                options:{
                    file:"app.js",
                    args:[],
                    ignoredFiles:["README.md","node_modules/**",".DS_Store"],
                    watchedExtensions:["js"],
                    watchedFolders:["app","config"],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    Cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks:["nodemon","watch"],
            options:{
                logConcurrentOutput:true
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.option("force",true);//避免因为语法的错误或者报警而中端整个grunt服务
    grunt.registerTask("default",["concurrent"])
}
