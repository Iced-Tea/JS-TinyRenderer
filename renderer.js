/*! SoftwareRenderer - ver. 0.1.0 */
OBJmodel=function(){function a(){this.verts=[],this.faces=[],this.normals=[],this.texcoords=[]}return a.parse=function(a,b){for(var c=function(b){return a[b].split(" ").splice(1,3)},d=0;d<a.length;d++)switch(a[d].substr(0,2)){case"v ":b.verts.push(new f32a(c(d)));break;case"vn":b.normals.push(new f32a(c(d)));break;case"vt":b.texcoords.push(new f32a(c(d)));break;case"f ":for(var e=c(d),f=0;3>f;f++)e[f]=e[f].split("/").map(function(a){return parseInt(a-1)});b.faces.push(e)}console.log("total verts: "+b.verts.length),console.log("total normals: "+b.normals.length),console.log("total faces: "+b.faces.length)},a}(),Vec3=function(){function a(){}return a.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},a.cross=function(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]},a.reflect=function(b,c){var d=a.dot(b,c),e=[2*c[0]*d,2*c[1]*d,2*c[2]*d];return[e[0]-b[0],e[1]-b[1],e[2]-b[2]]},a.dist=function(a){for(var b=0,c=0;c<a.length;c++)b+=a[c]*a[c];return m.sqrt(b)},a.normalize=function(b){var c=1/a.dist(b);return[b[0]*c,b[1]*c,b[2]*c]},a}(),orient2d=function(a,b,c){return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])},barycentric=function(a,b){var c=a[0],d=a[1],e=a[2],f=[d[0]-c[0],d[1]-c[1],d[2]-c[2]],g=[e[0]-c[0],e[1]-c[1],e[2]-c[2]],h=[b[0]-c[0],b[1]-c[1],b[2]-c[2]],i=1/(f[0]*g[1]-g[0]*f[1]);return v=(h[0]*g[1]-g[0]*h[1])*i,w=(f[0]*h[1]-h[0]*f[1])*i,u=1-v-w,[u,v,w]},Buffer=function(){function a(a,b,c){this.ctx=a,this.w=b,this.h=c,this.calls=0,this.pixels=0,this.imgData=a.createImageData(this.w,this.h),this.buf=new ArrayBuffer(this.imgData.data.length),this.buf8=new Uint8ClampedArray(this.buf),this.buf32=new Uint32Array(this.buf),this.zbuf=new Uint32Array(this.imgData.data.length),this.points=new Int32Array(3)}return a.prototype={clear:function(a){for(var b=0;b<=this.h;b++)for(var c=0;c<this.w;c++){var d=this.index(c,b);this.set(c,b,a),this.zbuf[d]=0}},index:function(a,b){return(this.h-b)*this.w+a},set:function(a,b,c){var d=255&c[0]|(255&c[1])<<8|(255&c[2])<<16;this.buf32[this.index(a,b)]=4278190080|d},get:function(a,b){return this.buf32[this.index(a,b)]},triangle:function(a,b){this.points=[a[0][0],a[1][0],a[2][0]];for(var c=[a[0][1],a[1][1],a[2][1]],d=[a[0][2],a[1][2],a[2][2]],e=[a[0][3],a[1][3],a[2][3]],f=this.points,g=[this.w+1,this.h+1],h=[-1,-1],i=0;i<f.length;i++)for(var j=0;2>j;j++)g[j]=m.min(f[i][j],g[j]),h[j]=m.max(f[i][j],h[j]);if(!(g[0]>this.w||h[0]<0||g[1]>this.h||h[1]<0))for(var k,l,n,o,p,q=f[0][1]-f[1][1],r=f[1][0]-f[0][0],s=f[1][1]-f[2][1],t=f[2][0]-f[1][0],u=f[2][1]-f[0][1],v=f[0][0]-f[2][0],w=orient2d(f[1],f[2],g),x=orient2d(f[2],f[0],g),y=orient2d(f[0],f[1],g),z=[0,0,0],A=0,B=g[1];B<=h[1];B++){for(var C=[w,x,y],D=g[0];D<=h[0];D++){if(this.pixels++,(C[0]|C[1]|C[2])>0){bc=barycentric(f,[D,B,A]),A=0;for(var i=0;3>i;i++)A+=f[i][2]*bc[i];var E=this.index(D,B);if(this.zbuf[E]<A){var k,l,n,o,p;k=bc[0]*c[0][0]+bc[1]*c[1][0]+bc[2]*c[2][0],l=bc[0]*c[0][1]+bc[1]*c[1][1]+bc[2]*c[2][1],n=bc[0]*d[0][0]+bc[1]*d[1][0]+bc[2]*d[2][0],o=bc[0]*d[0][1]+bc[1]*d[1][1]+bc[2]*d[2][1],p=bc[0]*d[0][2]+bc[1]*d[1][2]+bc[2]*d[2][2],wx=bc[0]*e[0][0]+bc[1]*e[1][0]+bc[2]*e[2][0],wy=bc[0]*e[0][1]+bc[1]*e[1][1]+bc[2]*e[2][1],wz=bc[0]*e[0][2]+bc[1]*e[1][2]+bc[2]*e[2][2];var F=b.fragment([[k,l],[n,o,p],[wy,wx,wz]],z);if(!F){this.zbuf[E]=A,this.set(D,B,z),this.calls++}}}C[0]+=s,C[1]+=u,C[2]+=q}w+=t,x+=v,y+=r}},draw:function(){this.imgData.data.set(this.buf8),this.ctx.putImageData(this.imgData,0,0)}},a}(),Effect=function(){function a(){}return a.prototype={vertex:function(a){},fragment:function(a,b){},setParameters:function(a){var b=this;Object.keys(a).map(function(c){b[c]=a[c]})}},a}(),Texture=function(){function a(a){this.texData=null,this.buf32=null,this.source=a,this.texUV=new Int32Array(2),this.load()}return a.prototype={load:function(){img=new Image,img.src=this.source;var a=this;img.onload=function(){texCanvas=document.createElement("canvas"),ctx=texCanvas.getContext("2d"),texCanvas.width=img.width,texCanvas.height=img.height,ctx.drawImage(img,0,0),img.style.display="none",a.texData=ctx.getImageData(0,0,img.width,img.height);var b=new ArrayBuffer(a.texData.data.length);a.buf32=new Uint32Array(b);for(var c=0;c<a.buf32.length;c++){var d=a.texData.data,e=c<<2;a.buf32[c]=d[e]|d[e+1]<<8|d[e+2]<<16|d[e+3]<<24}}},sample:function(a,b){var c=(this.texData.data,m.floor(b[0]*this.texData.width)),d=m.floor(b[1]*this.texData.height);return i=(this.texData.height-d)*this.texData.width+c,smp=this.buf32[i],[255&smp,smp>>8&255,smp>>16&255,smp>>24&255]}},a}(),ContentManager=function(){function a(){}function b(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a,!0),d.onload=function(){200==d.status?b(d.response):c(Error(d.statusText))},d.onerror=c,d.send(null)})}function c(a){console.error("request failed!")}function d(){h++,console.log("requests done:",h),h==i&&(console.info("All content is ready"),g())}function e(a,e){var f=function(a){if(null!=e){var b=new OBJmodel,c=a.split("\n");OBJmodel.parse(c,b),j[e]=b,d()}};return b(a).then(f,c)}function f(a,b){console.log("Effect");var c=document.createElement("script");c.src=a,c.onload=function(){null!=b&&b(),d()},document.head.appendChild(c)}var g,h=0,i=0,j={};return a.prototype={load:function(a){return function(b,c){switch(c="undefined"!=typeof c?c:null,a){case"Model":return e(b,c);case"Texture":return loadTexture(b,c);case"Effect":return f(b,c)}}},contentCollection:function(){return j},finishedLoading:function(a){a||(a={}),i=a.numRequest||0,a.callback&&(g=a.callback)}},a}(),function(){m=Math,doc=document,f32a=Float32Array,Renderer=function(){function a(){}var b,c,d,e=0;return drawImage=function(){b.clear([255,255,255]),start=new Date,c.setParameters({r:e});for(var a=0;a<d.faces.length;a++){for(var f=d.faces[a],g=[],h=0;3>h;h++){var i=d.verts[f[h][0]],j=d.texcoords.length>0?d.texcoords[f[h][1]]:[0,0],k=d.normals.length>0?d.normals[f[h][2]]:[1,0,0],l=[i,j,k],m=c.vertex(l);g.push(m)}b.triangle(g,c)}b.draw(),e+=.001*((new Date).getTime()-start.getTime());var n="Frame took "+((new Date).getTime()-start.getTime())+" ms",o="Pixels drawn/found "+b.calls+"/"+b.pixels;doc.getElementById("info").innerHTML=n+"<br/>"+o,b.calls=0,b.pixels=0,requestAnimationFrame(function(){drawImage()})},a.prototype={modelReady:function(a,e){return console.log("ready to render!"),function(){d=a.model,c=new DefaultEffect;var f=new Texture("assets/obj/diablo3/diablo3_pose_diffuse.png"),g=e.getContext("2d"),h=doc.getElementById("render_start");b=new Buffer(g,e.width,e.height),c.setParameters({scr_w:b.w,scr_h:b.h,texture:f}),h.style.display="block",h.onclick=function(){console.log("Begin render!"),startProfile=new Date,drawImage()}}}},a}()}();