(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2aa52f38"],{"386d":function(t,e,a){"use strict";var n=a("cb7c"),i=a("83a1"),o=a("5f1b");a("214f")("search",1,function(t,e,a,s){return[function(a){var n=t(this),i=void 0==a?void 0:a[e];return void 0!==i?i.call(a,n):new RegExp(a)[e](String(n))},function(t){var e=s(a,t,this);if(e.done)return e.value;var r=n(t),c=String(this),l=r.lastIndex;i(l,0)||(r.lastIndex=0);var h=o(r,c);return i(r.lastIndex,l)||(r.lastIndex=l),null===h?-1:h.index}]})},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},c6d5:function(t,e,a){},d855:function(t,e,a){"use strict";var n=a("c6d5"),i=a.n(n);i.a},eab3:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("van-nav-bar",{staticClass:"map-nav litheme",attrs:{fixed:"",border:!1,title:"地图","left-arrow":""},on:{"click-left":function(e){return t.$store.commit("GOBACK")}}},[a("van-icon",{attrs:{slot:"right",name:"search"},on:{click:function(e){t.isSearch=!0}},slot:"right"}),a("van-icon",{attrs:{slot:"right",name:"map-marked"},on:{click:t.toMe},slot:"right"})],1),a("form",{directives:[{name:"show",rawName:"v-show",value:t.isSearch,expression:"isSearch"}],attrs:{action:"/"}},[a("van-search",{staticClass:"map-search",attrs:{placeholder:"搜索地名","show-action":""},on:{search:t.searchArea,cancel:function(e){t.isSearch=!1}},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),a("div",{attrs:{id:"MapBox"}})],1)},i=[],o=(a("386d"),a("d225")),s=a("b0b4"),r=a("308d"),c=a("6bb5"),l=a("4e2b"),h=a("9ab4"),u=a("60a3"),v=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(r["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.user=t.$store.getters.user,t.isSearch=!1,t.value="",t}return Object(l["a"])(e,t),Object(s["a"])(e,[{key:"initMap",value:function(){this.map=new this.BMap.Map("MapBox");var t=this.point||new this.BMap.Point(116.404,39.915);this.map.centerAndZoom(t,50),this.map.enableScrollWheelZoom(),this.map.enableDragging(),this.$toast.clear()}},{key:"getLocation",value:function(t){var e=this,a=new this.BMap.Geolocation;a.getCurrentPosition(function(a){e.point=a.point;var n=new e.BMap.Icon("/icons/mapIcon.png",new e.BMap.Size(40,50));e.mk?e.mk.setPosition(e.point):(e.mk=new e.BMap.Marker(e.point,{icon:n}),e.initMap()),e.map.addOverlay(e.mk),t&&e.map.panTo(e.point)},function(t){console.log(t),e.timeEve&&clearInterval(e.timeEve)},{provider:"baidu"})}},{key:"toMe",value:function(){this.point?this.map.panTo(this.point):this.getLocation(!0)}},{key:"searchArea",value:function(){this.map.clearOverlays();var t=new this.BMap.LocalSearch(this.map,{renderOptions:{map:this.map}});t.search(this.value),this.mk&&this.map.addOverlay(this.mk)}},{key:"addEve",value:function(){var t=this;this.timeEve=setInterval(function(){t.getLocation(!1)},1e4)}},{key:"mounted",value:function(){this.$toast.loading({mask:!0,message:"加载中..."}),this.BMap=this.$win.BMap,this.getLocation(!0),this.addEve()}},{key:"beforeDestroy",value:function(){this.timeEve&&clearInterval(this.timeEve)}}]),e}(u["c"]);v=h["a"]([u["a"]],v);var p=v,d=p,m=(a("d855"),a("2877")),f=Object(m["a"])(d,n,i,!1,null,"2e4ea4ae",null);e["default"]=f.exports}}]);