(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ecec542"],{"175a":function(t,i,n){},"48ef":function(t,i,n){t.exports=n.p+"img/male.960485f7.svg"},"51b5":function(t,i,n){"use strict";var e=n("175a"),s=n.n(e);s.a},b9bf:function(t,i,n){t.exports=n.p+"img/female.88866ba0.svg"},ce45:function(t,i,n){"use strict";n.r(i);var e=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"find-wrap borderBox height100"},[e("van-nav-bar",{staticClass:"litheme",attrs:{fixed:"",border:!1},on:{"click-right":function(i){return t.$store.commit("GOLEFT","/setting")}}},[e("van-icon",{attrs:{slot:"right",name:"setting-o"},slot:"right"})],1),e("div",{staticClass:"find-user max1100 bgtheme",on:{click:function(i){return t.$store.commit("GOLEFT","/userhomepage")}}},[e("img",{attrs:{src:t.user.avatar}}),e("div",[e("p",[t._v(t._s(t.user.name)+" "),e("img",{staticClass:"icon-sex",attrs:{src:1==t.user.sex?n("48ef"):n("b9bf")}})]),e("span",[t._v(t._s(t.user.profile||"这个人超级懒，什么都没留下"))]),e("van-icon",{staticClass:"me-icon",attrs:{name:"arrow"}})],1)]),e("div",{staticClass:"my-info max1100"},[e("van-cell-group",{attrs:{title:""}},[e("van-cell",{attrs:{title:"天气","is-link":"",icon:"/icons/weather.svg"},on:{click:function(i){return t.$store.commit("GOLEFT","/weather")}}}),e("van-cell",{attrs:{title:"地图","is-link":"",icon:"/icons/map.svg"},on:{click:function(i){return t.$store.commit("GOLEFT","/MyMap")}}})],1),e("van-cell-group",{attrs:{title:""}},[e("van-cell",{attrs:{title:"用一用","is-link":"",icon:"/icons/expression.svg"},on:{click:function(i){return t.$store.commit("GOLEFT","/applications")}}}),e("van-cell",{attrs:{title:"玩一玩","is-link":"",icon:"/icons/game.svg"},on:{click:function(i){return t.$store.commit("GOLEFT","/games")}}}),e("van-cell",{attrs:{title:"听一听","is-link":"",icon:"/icons/music.svg"},on:{click:function(i){return t.$store.commit("GOLEFT","/music")}}})],1),e("van-cell-group",{attrs:{title:""}},[e("van-cell",{attrs:{title:"酷站","is-link":"",icon:"/icons/star.svg"},on:{click:function(i){return t.$store.commit("GOLEFT","/other")}}})],1)],1)],1)},s=[],c=n("d225"),r=n("308d"),a=n("6bb5"),o=n("4e2b"),l=n("9ab4"),u=n("60a3"),m=function(t){function i(){var t;return Object(c["a"])(this,i),t=Object(r["a"])(this,Object(a["a"])(i).apply(this,arguments)),t.user=t.$store.getters.user,t}return Object(o["a"])(i,t),i}(u["c"]);m=l["a"]([u["a"]],m);var v=m,f=v,g=(n("51b5"),n("2877")),p=Object(g["a"])(f,e,s,!1,null,"269ba7d7",null);i["default"]=p.exports}}]);