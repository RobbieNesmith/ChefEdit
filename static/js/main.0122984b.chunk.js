(this["webpackJsonpchef-edit"]=this["webpackJsonpchef-edit"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i=n(9),c=n.n(i),a=(n(14),n(15),n(4)),l=n.n(a),s=n(6),u=n(2),d=n(0);function f(e){var t=Object(r.useState)(!1),n=Object(u.a)(t,2),o=n[0],i=n[1];return Object(d.jsxs)("div",{className:"MenuCategory",onClick:function(){return i((function(e){return!e}))},onMouseLeave:function(){return i(!1)},children:[Object(d.jsx)("span",{children:e.name}),o?Object(d.jsx)("ul",{children:e.children}):null]})}n(18);function b(e){return Object(d.jsx)("li",{onClick:e.callback,children:e.name})}var h=n(3);function j(){return Array(300).fill(0)}var g=Object(r.createContext)({leftClickPressed:!1,rightClickPressed:!1,foregroundVisible:!0,leftClickTileId:0,rightClickTileId:0,foregroundTiles:j(),backgroundTiles:j(),levelData:new ArrayBuffer(0),mobs:new Array,setLeftClickPressed:function(e){throw new Error("Editor State Context not found")},setRightClickPressed:function(e){throw new Error("Editor State Context not found")},toggleForegroundVisible:function(){throw new Error("Editor State Context not found")},setLeftClickTileId:function(e){throw new Error("Editor State Context not found")},setRightClickTileId:function(e){throw new Error("Editor State Context not found")},setLevelData:function(e){throw new Error("Editor State Context not found")},setForegroundTiles:function(e){throw new Error("Editor State Context not found")},setBackgroundTiles:function(e){throw new Error("Editor State Context not found")},setMobs:function(e){throw new Error("Editor State Context not found")},placeForegroundTileAtIndex:function(e,t){throw new Error("Editor State Context not found")},placeBackgroundTileAtIndex:function(e,t){throw new Error("Editor State Context not found")},pickTile:function(e){throw new Error("Editor State Context not found")}});function p(){return Object(r.useContext)(g)}function m(e){var t=Object(r.useState)(!1),n=Object(u.a)(t,2),o=n[0],i=n[1],c=Object(r.useState)(!1),a=Object(u.a)(c,2),l=a[0],s=a[1],f=Object(r.useState)(!0),b=Object(u.a)(f,2),p=b[0],m=b[1],O=Object(r.useState)(0),x=Object(u.a)(O,2),k=x[0],T=x[1],v=Object(r.useState)(0),C=Object(u.a)(v,2),y=C[0],w=C[1],S=Object(r.useState)(j()),P=Object(u.a)(S,2),A=P[0],E=P[1],F=Object(r.useState)(j()),I=Object(u.a)(F,2),L=I[0],M=I[1],N=Object(r.useState)(new ArrayBuffer(0)),D=Object(u.a)(N,2),B=D[0],R=D[1],V=Object(r.useState)([]),U=Object(u.a)(V,2),H=U[0],G=U[1];function J(e,t){E((function(n){return[].concat(Object(h.a)(n.slice(0,e)),[t],Object(h.a)(n.slice(e+1)))}))}function W(e,t){M((function(n){return[].concat(Object(h.a)(n.slice(0,e)),[t],Object(h.a)(n.slice(e+1)))}))}function X(e){T(e)}var Y=Object(r.useMemo)((function(){return{leftClickPressed:o,rightClickPressed:l,foregroundVisible:p,leftClickTileId:k,rightClickTileId:y,foregroundTiles:L,backgroundTiles:A,levelData:B,mobs:H,setLeftClickPressed:i,setRightClickPressed:s,toggleForegroundVisible:function(){return m((function(e){return!e}))},setLeftClickTileId:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return T(e)})),setRightClickTileId:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return w(e)})),setLevelData:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return R(e)})),setForegroundTiles:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return M(e)})),setBackgroundTiles:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return E(e)})),setMobs:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return G(e)})),placeForegroundTileAtIndex:W,placeBackgroundTileAtIndex:J,pickTile:X}}),[o,l,p,k,y,L,A,B,H]);return Object(d.jsx)(g.Provider,{value:Y,children:e.children})}function O(e){if(!e.shown)return null;return Object(d.jsx)("div",{className:"FileLoadBackdrop",onClick:e.onDismiss,children:Object(d.jsx)("div",{className:"FileLoadModal",onClick:function(e){return e.stopPropagation()},children:Object(d.jsxs)("form",{onSubmit:function(t){var n=t.currentTarget.elements.fileInput.files;(null===n||void 0===n?void 0:n.length)&&e.onConfirm(n[0]),t.stopPropagation(),t.preventDefault()},children:[Object(d.jsx)("div",{children:Object(d.jsx)("input",{name:"fileInput",type:"file"})}),Object(d.jsxs)("div",{children:[Object(d.jsx)("button",{type:"submit",children:"Load into editor"}),Object(d.jsx)("button",{onClick:e.onDismiss,children:"Cancel"})]})]})})})}var x=1360;function k(e){return T.apply(this,arguments)}function T(){return(T=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){var n=new FileReader;n.onloadend=function(){return e(n.result)},n.readAsArrayBuffer(t)})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e){for(var t=new Uint16Array(e.slice(88,688)),n=[],r=0;r<300;r++)n.push(t[r]);return n}function C(e){for(var t=new Uint16Array(e.slice(756,1356)),n=[],r=0;r<300;r++)n.push(t[r]);return n}function y(e,t){var n,r=new Uint8Array(e),o=0,i=3;0!==t&&(i=4);var c=0;16&r[0]&&(c=4),1&r[0]&&(c+=4),n=e.slice(i,i+c),o+=i+c;var a=new Float32Array(e.slice(o,o+8)),l={x:a[0],y:a[1]};o+=8;for(var s=!!new Int32Array(e.slice(o,o+4)),u=o+=4;r[u];)u++;var d=(new TextDecoder).decode(new Uint8Array(e.slice(o,u))),f=r[o=u+1];o+=4;for(var b=[],h=0;h<f;h++){var j=new Float32Array(e.slice(o,o+8));b.push({x:j[0],y:j[1]}),o+=8}return{id:t,rawData:r,extraData:n,startingCoordinates:l,flippedH:s,name:d,pathCoordinates:b}}function w(e){for(var t=new Uint8Array(e.slice(x)),n=t[0],r=1,o=r,i=0,c=[];c.length<n;){for(;i<8||255===t[r];)255===t[r]?i++:i=0,r++;c.push(e.slice(x+o,x+r)),o=r,i=0}return c.map(y)}function S(){var e=p(),t=e.toggleForegroundVisible,n=e.setLevelData,o=e.setForegroundTiles,i=e.setBackgroundTiles,c=e.setMobs,a=Object(r.useState)(!1),h=Object(u.a)(a,2),j=h[0],g=h[1];function m(){return(m=Object(s.a)(l.a.mark((function e(t){var r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,k(t);case 3:r=e.sent,o(C(r)),i(v(r)),a=w(r),console.log(a),c(a),n(r),g(!1);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(d.jsxs)("div",{className:"HeaderBar",children:[Object(d.jsxs)(f,{name:"file",children:[Object(d.jsx)(b,{name:"New",callback:function(){return console.log("new file")}}),Object(d.jsx)(b,{name:"Open",callback:function(){return g(!0)}}),Object(d.jsx)(b,{name:"Save",callback:function(){return console.log("save file")}})]}),Object(d.jsxs)(f,{name:"edit",children:[Object(d.jsx)(b,{name:"Cut",callback:function(){return console.log("cut")}}),Object(d.jsx)(b,{name:"Copy",callback:function(){return console.log("copy")}}),Object(d.jsx)(b,{name:"Paste",callback:function(){return console.log("paste")}})]}),Object(d.jsx)(f,{name:"view",children:Object(d.jsx)(b,{name:"Switch Layer",callback:t})}),Object(d.jsx)(O,{shown:j,onConfirm:function(e){return m.apply(this,arguments)},onDismiss:function(){return g(!1)}})]})}var P=["Empty tile","The left edge of a platform","The middle of a platform","The right edge of a platform","A single brick","A decorative brick","Tileable floor","The left edge of a platform","The middle of a platform","The middle of a platform","The right edge of a platform","A solid on top platform","A single brick","The left edge of a block","The right edge of a block","The left edge of a block","The right edge of a block","The left edge of a block","The right edge of a block","The top edge of a block","The left edge of a block","The right edge of a block","A solid on top platform","The left edge of a block","The right edge of a block","The left edge of a block","The right edge of a block","A solid on top platform","The left edge of a platform","The middle of a platform","The right edge of a platform","The left edge of a platform","The middle of a platform","The middle of a platform","The right edge of a platform","????","????","????","????","The bottom edge of a block","The left edge of a platform","The middle of a platform","The right edge of a platform","The left edge of a platform","The middle of a platform","The right edge of a platform","The left edge of a platform","The middle of a platform","The right edge of a platform","The left edge of a platform","The middle of a platform","The right edge of a platform","A dissolving platform","A dissolving platform","A dissolving platform","A dissolving platform","A dissolving platform","A dissolving platform","????","????","Banana item","Grape item","Cherry item","Watermelon item","Peach item","????","????"];n(19);function A(){return Array(340).fill(0).map((function(e,t){return function(e){return{id:e,xOffset:e%16*-32,yOffset:-32*Math.floor(e/16),description:e<P.length?P[e]:""}}(t)}))}function E(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(!0),c=Object(u.a)(i,2),a=c[0],l=c[1],s=p(),f=s.leftClickTileId,b=s.rightClickTileId,h=s.setLeftClickTileId,j=s.setRightClickTileId;function g(e,t){0===e.button?h(t):2===e.button&&j(t),e.preventDefault(),e.stopPropagation()}return Object(r.useEffect)((function(){o(A())}),[]),Object(d.jsxs)("div",{className:"BlockPalette",style:{left:a?0:"-15rem"},children:[Object(d.jsx)("ul",{children:n.map((function(e){var t="";return f===e.id?(t="LeftClick",b===e.id&&(t="LeftRightClick")):b===e.id&&(t="RightClick"),Object(d.jsxs)("li",{className:t,onClick:function(t){return g(t,e.id)},onContextMenu:function(t){return g(t,e.id)},children:[Object(d.jsx)("div",{className:"BlockImage",style:{backgroundPositionX:"".concat(e.xOffset,"px"),backgroundPositionY:"".concat(e.yOffset,"px")}}),Object(d.jsx)("div",{className:"BlockDescription",children:e.description})]},e.id)}))}),Object(d.jsx)("div",{className:"CollapseBlockPalette",onClick:function(){return l((function(e){return!e}))},children:a?"<":">"})]})}n(20);function F(e){var t=p(),n=t.leftClickPressed,r=t.rightClickPressed,o=t.leftClickTileId,i=t.rightClickTileId,c=t.setLeftClickPressed,a=t.setRightClickPressed;return Object(d.jsx)("div",{className:"TileGrid",children:e.tiles.map((function(t,l){var s=function(e){return{xOffset:e%16*-32,yOffset:-32*Math.floor(e/16)}}(t);return Object(d.jsx)("div",{className:"Tile",style:{backgroundPositionX:s.xOffset,backgroundPositionY:s.yOffset},onMouseDown:function(t){return function(t,n){n.stopPropagation(),n.preventDefault(),0===n.button?(c(!0),a(!1),e.onTilePlaced(t,o)):1===n.button?(c(!1),a(!1),e.onTilePicked(e.tiles[t])):2===n.button&&(c(!1),a(!0),e.onTilePlaced(t,i))}(l,t)},onMouseMove:function(t){return function(t,c){n?e.onTilePlaced(t,o):r&&e.onTilePlaced(t,i),c.stopPropagation(),c.preventDefault()}(l,t)}},l)}))})}function I(){var e=p(),t=e.foregroundVisible,n=e.toggleForegroundVisible,r=e.backgroundTiles,o=e.foregroundTiles,i=e.placeBackgroundTileAtIndex,c=e.placeForegroundTileAtIndex,a=e.pickTile,l=e.mobs;return Object(d.jsx)("div",{className:"LevelEditor",children:Object(d.jsxs)("div",{className:"TileGridHolder",children:[Object(d.jsx)(F,{tiles:r,onTilePicked:a,onTilePlaced:i}),t?Object(d.jsx)(F,{tiles:o,onTilePicked:a,onTilePlaced:c}):null,Object(d.jsxs)("div",{className:"LayerTab",onClick:n,style:{backgroundColor:t?"#6888e8":"#e09038"},children:["Editing: ",t?"Foreground":"Background"]}),l.map((function(e){var t="M ".concat(e.startingCoordinates.x," ").concat(e.startingCoordinates.y),n=e.pathCoordinates.map((function(e){return"L ".concat(e.x," ").concat(e.y)})),r=[t].concat(Object(h.a)(n)).join(" ");return Object(d.jsxs)(d.Fragment,{children:[r.length>1&&Object(d.jsx)("svg",{width:"640",height:"480",className:"MobPath",children:Object(d.jsx)("path",{stroke:"#FF00FF",strokeWidth:"2",d:r})}),Object(d.jsx)("div",{className:"Mob",style:{left:e.startingCoordinates.x,bottom:480-e.startingCoordinates.y},children:Object(d.jsx)("img",{src:"".concat("/ChefEdit","/img/").concat(e.name,".gif"),alt:e.name})}),e.pathCoordinates.map((function(t){return Object(d.jsx)("div",{className:"Mob",style:{opacity:.5,left:t.x,bottom:480-t.y},children:Object(d.jsx)("img",{src:"".concat("/ChefEdit","/img/").concat(e.name,".gif"),alt:e.name})})}))]})}))]})})}function L(e){var t=e.mob;return Object(d.jsxs)("li",{children:[Object(d.jsx)("div",{children:t.name}),Object(d.jsx)("div",{children:"Starting Coordinates"}),Object(d.jsxs)("div",{children:[t.startingCoordinates.x,", ",t.startingCoordinates.y]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("input",{type:"checkbox",disabled:!0,checked:!!t.extraData})," Has extra data?"]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("input",{type:"checkbox",disabled:!0,checked:!!t.flippedH})," Flipped horizontally?"]}),Object(d.jsx)("div",{children:"Path Coordinates"}),Object(d.jsx)("div",{children:t.pathCoordinates.map((function(e){return Object(d.jsxs)("div",{children:[e.x,", ",e.y]})}))})]})}n(21);function M(){var e=Object(r.useState)(!1),t=Object(u.a)(e,2),n=t[0],o=t[1],i=p().mobs;return Object(d.jsxs)("div",{className:"MobSidebar",style:{right:n?0:"-15rem"},children:[Object(d.jsx)("ul",{children:i.map((function(e){return Object(d.jsx)(L,{mob:e})}))}),Object(d.jsx)("div",{className:"CollapseMobSidebar",onClick:function(){return o((function(e){return!e}))},children:n?">":"<"})]})}var N=function(){var e=p(),t=e.setLeftClickPressed,n=e.setRightClickPressed;return Object(d.jsxs)("div",{className:"App",onMouseUp:function(){t(!1),n(!1)},onContextMenu:function(e){e.stopPropagation(),e.preventDefault()},children:[Object(d.jsx)(S,{}),Object(d.jsxs)("div",{className:"ContentContainer",children:[Object(d.jsx)(E,{}),Object(d.jsx)(I,{}),Object(d.jsx)(M,{})]})]})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),o(e),i(e),c(e)}))};c.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(m,{children:Object(d.jsx)(N,{})})}),document.getElementById("root")),D()}],[[22,1,2]]]);
//# sourceMappingURL=main.0122984b.chunk.js.map