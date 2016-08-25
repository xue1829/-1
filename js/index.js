/*
 * @Author: zhengwei
 * @Date:   2016-07-13 14:53:22
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-07-13 17:16:33
 */

'use strict';
$(function() {
    $('[data-toggle="tooltip"]').tooltip();
    //1.首先需求是大屏幕的时候显示的是大图 然后用背景图的方式显示
    //2.小屏幕显示小图用图片标签的方式实现
    //1.首先要知道什么时候是大屏 什么时候是小屏
    //2.我们参照Bootstrap的栅格系统屏幕宽度小于768px认为是小屏
    //3.大于768是大屏
    //4.如果是大屏幕设置大图的路径 是设置背景图
    //5.如果是小屏设置小图路径 是设置图片标签
    //6.首先得知道屏幕宽度
    //7.拿屏幕宽度和768进行对比

    //屏幕宽度变化每次都得获取屏幕宽度进行判断
    //要知道屏幕宽度改变了
    $(window).on('resize', function() {
        var windowWidth = $(window).width(); //获取屏幕宽度
        var $itemImage = $('.carousel-inner .item');
        if (windowWidth > 768) {
            //说明是大图
            //设置大图的路径 是设置背景图
            //那这个大图小图的路径从哪来 推荐使用自定义data-属性
            //设置到每一个.item  获取所有item
            //遍历每一个item设置
            $itemImage.each(function(index, el) {
                var $item = $(el);
                var imgSrc = $item.data('large-image');
                //设置到这个item身上
                $item.css('background-image', 'url(' + imgSrc + ')');
                $item.html("");
            });
        } else if (windowWidth <= 768) {
            //说明是小图
            //设置小图路径 是设置图片标签
            $itemImage.each(function(index, el) {
                var $item = $(el);
                var imgSrc = $item.data('small-image');
                $item.html('<img src="' + imgSrc + '" alt="" />');
                $item.css('background-image', "");
            });
        }
        var tabs = $('#products .nav-tabs');
        var lis = $('#products .nav-tabs li');
        var width = 0;
        lis.each(function(index, el) {
            width += $(el).width();
        });
        tabs.css('width', width);
    }).trigger('resize');
    //1.添加滑动事件
    //2.判断滑动的方向如果是从左往右就切换到上一张 .carousel('prev')
    //3.从右往左切换到下一张 .carousel('next')
    //获取轮播图外面的容器
    var slide = document.querySelector('#slide');
    var startX = 0;
    var endX = 0;
    // 获取轮播图这个元素
    var carousel = $('#slide .carousel');
    slide.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    slide.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            //从左往右滑动
            //调用Bootstrap提供的切换上一张图片的方法 里面的参数就是一个'prev'字符串
            carousel.carousel('prev');
        } else {
            //从右往左滑动
            //调用Bootstrap提供的切换下一张图片的方法 里面的参数就是一个'next'字符串
            carousel.carousel('next');
        }
    });
})
