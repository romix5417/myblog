var express = require('mongoose');
var User = require('./../models/user.models');
//var passport = require('passport');
//var Strategy = require('passport-local').Strategy;

module.exports = function(app){
    //首页
    app.get('/', function (req, res, next) {
        res.redirect('login');
    });

    app.get('/login',function(req,res,next){
        res.render('login',{
            title:'登录',
        });
    });

    app.post('/login', function (req, res) {

        var user = new User({
            username:req.body.username,
            password:req.body.password,
        });

        var admin = {"username":"admin","password":"etwsadmin"};
        
        function showMessage(message, res) {
            var result=`<script>alert('${message}');history.back()</script>`;
            res.send(result)
        }

        if(user.username == admin.username && user.password == admin.password){
            req.session.user = user.username;
            res.redirect("index");
        }else{
            showMessage("登录失败，用名或者密码错误！", res);
        }

        //创建本地策略
        /*passport.use('local', new Strategy({
                // 需要验证的字段名称
                username:'username',
                password: 'passwrod'
            },
            // 回调函数
            function(username, password, cb) {
                //验证不通过

                console.log("username:%s", username);
                console.log("password:%s", password);

                console.log("user.username:%s", );
                console.log("user.password:%s", );


                if(username != user.username) {
                    return cb(null, false, {message: '用户名错误'});
                }
                if(password != user.password) {
                    return cb(null, false, {message: '密码错误'});
                }
                //验证通过
                res.redirect('index');
            }
        ));*/
    });

    app.get('/index',function(req,res,next){

        var user = new User({
            username:req.body.username,
            password:req.body.password,
        });

        console.log("user.username:%s", user.username);
        console.log("user.password:%s", user.password);

        res.render('index',{
            title:'ETWS雷达网络管理系统',
        });
    });

    app.get('/devstat',function(req,res,next){

        res.render('devstat',{
            title:'设备状态',
        });
    });

    //注册用户
    app.post('/reg', function (req, res) {

        var user = new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        });

        if(req.body['password'] != req.body['password-repeat']){

            //req.flash("error",'两次输入的密码不一致');
            console.log('两次输入的密码不一致');
            return res.redirect('/');//返回注册页
        }

        User.findOne({'username':user.username},function(err,data){
            if(err){
                //req.flash("err",err);
                return res.redirect('/');
            }
            if(data != null){
                //req.flash('error','该用户已存在');
                console.log('该用户已存在');
                return res.redirect('/reg');//返回注册页
            }else{
                //保存新的用户
                user.save(function(err){
                    if(err){
                        //req.flash('err',err);
                        console.log(err);
                        return res.redirect('/');
                    }
                    //req.flash('success', '注册成功!');
                    console.log('注册用户成功');
                    res.redirect('/');//注册成功后返回主页
                })
            }
        })
    });

    //注册页面
    app.get('/reg', function (req, res, next) {
        res.render('reg', {
            title:'注册',
        });
    });

    //登陆
    app.get('/login_bk', function (req, res, next) {
        res.render('login_bk', {
            title:'登录',
        });
    });

    app.get('/logout', function (req, res, next) {
        delete req.session.user;
        res.redirect('login');
    });

    app.get('/post', function (req, res, next) {
        res.render('post', {
            title:'发表文章',
        });
    });
};