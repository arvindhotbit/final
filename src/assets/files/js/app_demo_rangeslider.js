"use strict";$(function(){$("#ise_default").ionRangeSlider({from:15}),$("#ise_min_max").ionRangeSlider({min:100,max:1e3,from:550}),$("#ise_prefix").ionRangeSlider({type:"double",grid:!0,min:0,max:1e3,from:200,to:800,prefix:"$"}),$("#ise_step").ionRangeSlider({type:"double",grid:!0,min:0,max:1e4,from:3e3,to:7e3,step:250}),$("#ise_custom_values").ionRangeSlider({grid:!0,from:3,values:["January","February","March","April","May","June","July","August","September","October","November","December"]}),$("#ise_decorate").ionRangeSlider({type:"double",min:100,max:200,from:145,to:155,prefix:"Weight: ",postfix:" million pounds",decorate_both:!1}),$("#ise_limited_range").ionRangeSlider({type:"double",min:0,max:100,from:20,from_min:10,from_max:30,from_shadow:!0,to:80,to_min:70,to_max:90,to_shadow:!0,grid:!0,grid_num:10}),$("#ise_disabled").ionRangeSlider({min:0,max:100,from:30,disable:!0}),setTimeout(function(){$(window).resize()},300)});