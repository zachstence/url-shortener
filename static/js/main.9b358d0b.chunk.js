(this["webpackJsonpurl-shortener-ui"]=this["webpackJsonpurl-shortener-ui"]||[]).push([[0],{53:function(e,t,r){},55:function(e,t,r){},64:function(e,t,r){},65:function(e,t,r){"use strict";r.r(t);var n=r(0),c=r.n(n),a=r(26),s=r.n(a),o=r(9),i=r(2),u=r(5),l=r.n(u),h=r(6),j=r(7),b=r(27),p=r.n(b).a.create({baseURL:"https://zach08-url-shortener.herokuapp.com"}),d=function(){var e=Object(h.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.post("/add",t,{headers:{"Content-Type":"text/plain"}});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(h.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.get("/".concat(t));case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=(r(53),r(1)),f=function(){var e=Object(n.useState)(""),t=Object(j.a)(e,2),r=t[0],c=t[1],a=Object(n.useState)(""),s=Object(j.a)(a,2),o=s[0],i=s[1],u=Object(n.useState)(!1),b=Object(j.a)(u,2),p=b[0],O=b[1],f=function(){var e=Object(h.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),O(!1),i(""),e.prev=3,e.next=6,d(r);case 6:n=e.sent,i("".concat(window.location.href).concat(n)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),O(!0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{className:"shorten",children:[Object(x.jsx)("p",{className:"instructions",children:"Enter a URL you would like to shorten, then click SHORTEN!"}),Object(x.jsxs)("form",{onSubmit:f,children:[Object(x.jsxs)("div",{className:"input-group",children:[Object(x.jsx)("label",{htmlFor:"url",children:"URL"}),Object(x.jsx)("input",{autoFocus:!0,id:"url",className:"gradient-border",type:"text",value:r,placeholder:"https://www.website.com/with/a/long/url",onChange:function(e){return c(e.target.value)}})]}),Object(x.jsx)("button",{type:"submit",children:"SHORTEN"})]}),p?Object(x.jsx)("p",{className:"error",children:"Error: Malformed URL. Please try again."}):o?Object(x.jsxs)("p",{className:"short",children:["Your shortened URL: ",Object(x.jsx)("a",{href:o,className:"short",children:o})]}):null]})},m=(r(55),function(){var e=Object(n.useState)(!1),t=Object(j.a)(e,2),r=t[0],c=t[1],a=Object(i.f)().id,s=function(){var e=Object(h.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O(a);case 3:t=e.sent,window.location.assign(t),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),c(!0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){s()}),[]),r?Object(x.jsx)("div",{className:"redirect",children:Object(x.jsxs)("div",{className:"error",children:[Object(x.jsx)("h1",{children:"Error"}),Object(x.jsxs)("div",{className:"message",children:["The short URL ",Object(x.jsx)("pre",{children:window.location.href})," does not exist."]}),Object(x.jsx)(o.b,{className:"back-to-home",to:"/",children:"Back To Home"})]})}):null}),v=(r(64),function(){return Object(x.jsxs)("div",{className:"app",children:[Object(x.jsx)("main",{children:Object(x.jsxs)(i.c,{children:[Object(x.jsx)(i.a,{exact:!0,path:"/",component:f}),Object(x.jsx)(i.a,{exact:!0,path:"/:id",component:m})]})}),Object(x.jsx)("footer",{children:Object(x.jsx)("a",{href:"https://github.com/zachstence/url-shortener",children:Object(x.jsx)("img",{src:"github.png",alt:"GitHub Icon"})})})]})});s.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(o.a,{children:Object(x.jsx)(v,{})})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.9b358d0b.chunk.js.map