(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a8cfc88c"],{"024f":function(t,s,a){"use strict";var e=a("1d79"),i=a.n(e);i.a},"1d79":function(t,s,a){},"2dc0":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[1==t.imgList.length?a("div",{staticClass:"img1-box"},[a("img",{attrs:{src:t.imgList[0]},on:{click:function(s){return s.stopPropagation(),t.toShowImg(0)}}})]):a("div",{class:4==t.imgList.length?"img9-box img4-box":"img9-box"},t._l(t.imgList,function(s,e){return a("div",{key:e,on:{click:function(s){return s.stopPropagation(),t.toShowImg(e)}}},[a("van-image",{attrs:{fit:"cover","lazy-load":"",src:s}})],1)}),0)])},i=[],n=a("d225"),o=a("b0b4"),r=a("308d"),c=a("6bb5"),l=a("4e2b"),u=a("9ab4"),v=a("60a3"),m=function(t){function s(){var t;return Object(n["a"])(this,s),t=Object(r["a"])(this,Object(c["a"])(s).apply(this,arguments)),t.showImg=!1,t.imgList=[],t}return Object(l["a"])(s,t),Object(o["a"])(s,[{key:"created",value:function(){for(var t=0;t<this.num;t++)this.imgList.push("https://img.zcool.cn/community/013a835d78c419a801211d53128042.jpg@260w_195h_1c_1e_1o_100sh.jpg");this.imgList.length>9&&this.imgList.splice(9)}},{key:"toShowImg",value:function(t){this.$ImagePreview({images:this.imgList,startPosition:t,closeOnPopstate:!0,loop:!1,lazyLoad:!0})}}]),s}(v["c"]);u["a"]([Object(v["b"])()],m.prototype,"num",void 0),m=u["a"]([v["a"]],m);var d=m,p=d,b=(a("49b3"),a("2877")),f=Object(b["a"])(p,e,i,!1,null,"cb79c152",null);s["a"]=f.exports},"49b3":function(t,s,a){"use strict";var e=a("cc4a"),i=a.n(e);i.a},"6a32":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"usercenter"},[a("van-nav-bar",{class:t.isScroll?"litheme":"my-nav-bar",attrs:{fixed:"",title:"我的主页",border:!1,"left-arrow":""},on:{"click-left":function(s){return t.$store.commit("GOBACK")}}},[a("van-icon",{attrs:{slot:"right",name:"edit"},on:{click:function(s){return t.$store.commit("GOLEFT","/UserEdit")}},slot:"right"})],1),a("div",{staticClass:"usercenter-top"},[a("div",{staticClass:"user-bg"},[a("div",{staticClass:"bg-mask",style:{backgroundImage:"url("+t.user.avatar+")"}}),a("div",{staticClass:"top-mask"}),a("van-icon",{staticClass:"re-btn",attrs:{name:"replay",size:"26px"},on:{click:t.refreshUser}})],1),a("div",{staticClass:"user-box max1100"},[a("img",{attrs:{src:t.user.avatar}}),a("div",[a("b",[t._v(t._s(t.user.name))]),a("p",[t._v(t._s(1==t.user.sex?"男":"女")+"   "+t._s(t.user.province)+"   "+t._s(t.user.city))])])])]),a("div",{staticClass:"max1100"},[a("van-tabs",{attrs:{swipeable:"",sticky:"",border:!1,"line-width":"26","offset-top":44},on:{change:t.tabChange},model:{value:t.active,callback:function(s){t.active=s},expression:"active"}},[a("van-tab",{attrs:{title:"动态",name:"dongtai"}},[a("UserDynamic",{attrs:{user:t.user}})],1),a("van-tab",{attrs:{title:"帖子",name:"post"}},[a("UserPost",{attrs:{user:t.user}})],1),a("van-tab",{attrs:{title:"评论",name:"comment"}},[a("UserComment",{attrs:{user:t.user}})],1)],1)],1)],1)},i=[],n=(a("7f7f"),a("d225")),o=a("b0b4"),r=a("308d"),c=a("6bb5"),l=a("4e2b"),u=a("9ab4"),v=a("60a3"),m=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("van-pull-refresh",{attrs:{"pulling-text":"下拉刷新"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}},[a("div",{staticClass:"post-box"},t._l(15,function(s,e){return a("div",{key:e,staticClass:"post-item",on:{click:function(s){return t.$store.commit("GOLEFT","/postdetails/"+e)}}},[a("div",{staticClass:"post-user"},[a("img",{attrs:{src:t.user.avatar}}),a("div",{staticClass:"post-user-text"},[a("p",[t._v(t._s(t.user.name))]),a("span",[t._v("9/13 21:46")])])]),a("div",{staticClass:"post-content"},[a("p",[t._v("突然有一天西游记没经费了，于是师徒四人.....")]),a("ImgBox",{attrs:{num:e}})],1),a("b",{staticClass:"post-tag"},[a("div",[a("span",[t._v("#")]),a("p",[t._v("沙雕俱乐部")]),a("van-icon",{attrs:{name:"arrow"}})],1)]),a("div",{staticClass:"post-san"},[a("div",[a("van-icon",{attrs:{name:"share"}}),t._v("15")],1),a("div",[a("van-icon",{attrs:{name:"chat-o"}}),t._v("15")],1),a("div",[a("van-icon",{attrs:{name:"upgrade"}}),t._v("15")],1)])])}),0)])],1)},d=[],p=a("2dc0"),b=function(t){function s(){var t;return Object(n["a"])(this,s),t=Object(r["a"])(this,Object(c["a"])(s).apply(this,arguments)),t.isLoading=!1,t.isScroll=!1,t}return Object(l["a"])(s,t),Object(o["a"])(s,[{key:"onRefresh",value:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1},1e3)}}]),s}(v["c"]);u["a"]([Object(v["b"])()],b.prototype,"user",void 0),b=u["a"]([Object(v["a"])({components:{ImgBox:p["a"]}})],b);var f=b,g=f,h=a("2877"),_=Object(h["a"])(g,m,d,!1,null,"6d634fc8",null),O=_.exports,j=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("van-pull-refresh",{attrs:{"pulling-text":"下拉刷新"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}},[a("div",{staticClass:"post-box dongtai-box"},t._l(15,function(s,e){return a("div",{key:e,staticClass:"post-item",on:{click:function(s){return t.$store.commit("GOLEFT","/dynamicdetails/"+e)}}},[a("div",{staticClass:"post-user"},[a("img",{attrs:{src:t.user.avatar}}),a("div",{staticClass:"post-user-text"},[a("p",[t._v(t._s(t.user.name))])]),a("span",[t._v("9/13 17:12")])]),a("div",{staticClass:"post-content"},[a("p",[t._v("今天天气很好，适合睡觉.....")]),a("ImgBox",{attrs:{num:e}})],1),a("div",{staticClass:"post-san"},[a("div",[a("van-icon",{attrs:{name:"eye-o"}}),t._v("15")],1),a("div",{staticClass:"post-san-right"},[a("van-icon",{attrs:{name:"chat-o"}}),a("van-icon",{attrs:{name:"good-job-o"}})],1)])])}),0)])],1)},x=[],y=function(t){function s(){var t;return Object(n["a"])(this,s),t=Object(r["a"])(this,Object(c["a"])(s).apply(this,arguments)),t.isLoading=!1,t.isScroll=!1,t}return Object(l["a"])(s,t),Object(o["a"])(s,[{key:"onRefresh",value:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1},1e3)}}]),s}(v["c"]);u["a"]([Object(v["b"])()],y.prototype,"user",void 0),y=u["a"]([Object(v["a"])({components:{ImgBox:p["a"]}})],y);var C=y,L=C,k=Object(h["a"])(L,j,x,!1,null,"5c949cc4",null),w=k.exports,$=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("van-pull-refresh",{attrs:{"pulling-text":"下拉刷新"},on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}},[a("div",{staticClass:"comment-box post-box"},t._l(15,function(s,e){return a("div",{key:e,staticClass:"post-item"},[a("div",{staticClass:"post-user"},[a("img",{attrs:{src:t.user.avatar}}),a("div",{staticClass:"post-user-text"},[a("p",[t._v(t._s(t.user.name))])]),a("div",{staticClass:"comment-right-icon"},[a("van-icon",{attrs:{name:"upgrade"}}),a("span",[t._v("8")])],1)]),a("div",{staticClass:"post-content"},[a("p",[t._v("突然有一天西游记没经费了，于是师徒四人.....")]),a("ImgBox",{attrs:{num:e}})],1),a("div",{staticClass:"my-right"},[a("span",{staticClass:"comment-item-btn"},[t._v("评论")])])])}),0)])],1)},I=[],S=function(t){function s(){var t;return Object(n["a"])(this,s),t=Object(r["a"])(this,Object(c["a"])(s).apply(this,arguments)),t.isLoading=!1,t.isScroll=!1,t}return Object(l["a"])(s,t),Object(o["a"])(s,[{key:"onRefresh",value:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1},1e3)}}]),s}(v["c"]);u["a"]([Object(v["b"])()],S.prototype,"user",void 0),S=u["a"]([Object(v["a"])({components:{ImgBox:p["a"]}})],S);var E=S,T=E,U=Object(h["a"])(T,$,I,!1,null,"75c718de",null),B=U.exports,P=a("4c73").persons,R=function(t){function s(){var t;return Object(n["a"])(this,s),t=Object(r["a"])(this,Object(c["a"])(s).apply(this,arguments)),t.user=t.$store.getters.user,t.isLoading=!1,t.isScroll=!1,t.active="dongtai",t.oldActive="dongtai",t.tabScrollList={dongtai:165,post:165,comment:165},t}return Object(l["a"])(s,t),Object(o["a"])(s,[{key:"onRefresh",value:function(){var t=this;setTimeout(function(){t.$toast("刷新成功"),t.isLoading=!1},1e3)}},{key:"tabChange",value:function(t){var s=document.getElementById("app");s.scrollTop>=165&&(this.tabScrollList[this.oldActive]=s.scrollTop,s.scrollTop=this.tabScrollList[t]),this.oldActive=t}},{key:"refreshUser",value:function(){var t=Math.floor(Math.random()*P.length);this.$store.commit("updateUserAvatar",P[t].avatar),this.$store.commit("updateUserName",P[t].name)}},{key:"mounted",value:function(){var t=this;window.addEventListener("scroll",function(s){s.target.scrollTop>100?t.isScroll=!0:t.isScroll=!1},!0)}}]),s}(v["c"]);R=u["a"]([Object(v["a"])({components:{UserPost:O,UserDynamic:w,UserComment:B}})],R);var A=R,z=A,G=(a("024f"),Object(h["a"])(z,e,i,!1,null,"e63b4b56",null));s["default"]=G.exports},cc4a:function(t,s,a){}}]);