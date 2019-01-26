var express = require('mongoose');
var User = require('./../models/user.models')

module.exports = function(app){
    //首页
    app.get('/',function(req,res,next){
        res.render('index',{
            title:'首页',
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
                        req.flash('err',err);
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
    })

    //注册页面
    app.get('/reg', function (req, res, next) {
        res.render('reg', {
            title:'注册',
        });
    })

    //登陆
    app.get('/login', function (req, res, next) {
        res.render('login', {
            title:'登录',
        });
    })

    app.get('/post', function (req, res, next) {
        res.render('post', {
            title:'发表文章',
        });
    })
}