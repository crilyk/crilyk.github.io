// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function() {
	if (document.hidden) {
		$('[rel="icon"]').attr('href', "/funny.ico");
		document.title = 'bye ~';
		clearTimeout(titleTime);
	} else {
		$('[rel="icon"]').attr('href', "/img/newtubiao.png");
		document.title = 'hi ~' + OriginTitle;
		titleTime = setTimeout(function() {
			document.title = OriginTitle;
		}, 2000);
	}
});

//背景特效
!
function(){
	function o(w,v,i){
		return w.getAttribute(v)||i
	}
	function j(i)
	{
		return document.getElementsByTagName(i)
	}
	function l(){
		var i=j("script"),
		w=i.length,
		v=i[w-1];
		return{
			l:w,
			z:o(v,"zIndex",-1),
			o:o(v,"opacity",0.5),
			c:o(v,"color","248,248,255"),
			n:o(v,"count",99)
		}
	}
	function k(){
		r=u.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
		n=u.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
	}
	function b(){
		e.clearRect(0,0,r,n);
		var w=[f].concat(t);
		var x,v,A,B,z,y;
		t.forEach(function(i){
			i.x+=i.xa,
			i.y+=i.ya,
			i.xa*=i.x>r||i.x<0?-1:1,
			i.ya*=i.y>n||i.y<0?-1:1,
			e.fillRect(i.x-0.5,i.y-0.5,1,1);
			for(v=0;v<w.length;v++){x=w[v];
				if(i!==x&&null!==x.x&&null!==x.y){
					B=i.x-x.x,
					z=i.y-x.y,
					y=B*B+z*z;
					y<x.max&&(x===f&&y>=x.max/2&&(i.x-=0.03*B,i.y-=0.03*z),
					A=(x.max-y)/x.max,e.beginPath(),
					e.lineWidth=A/2,
					e.strokeStyle="rgba("+s.c+","+(A+0.2)+")",
					e.moveTo(i.x,i.y),e.lineTo(x.x,x.y),e.stroke())
				}
			}
			w.splice(w.indexOf(i),1)}),
			m(b)
		}
		var u=document.createElement("canvas"),s=l(),c="c_n"+s.l,e=u.getContext("2d"),r,n,
		m=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(i){
			window.setTimeout(i,1000/45)},
			a=Math.random,
			f={x:null,y:null,max:20000};
			u.id=c;
			u.style.cssText="position:fixed;top:0;left:0;z-index:"+s.z+";opacity:"+s.o;
			j("body")[0].appendChild(u);
			k(),
			window.onresize=k;
			window.onmousemove=function(i){
				i=i||window.event,f.x=i.clientX,f.y=i.clientY
			},
			window.onmouseout=function(){
				f.x=null,f.y=null
			};
			for(var t=[],p=0;s.n>p;p++){
				var h=a()*r,g=a()*n,q=2*a()-1,d=2*a()-1;
				t.push({x:h,y:g,xa:q,ya:d,max:6000})
			}
			setTimeout(function(){b()},100)}();


//鼠标点击特效
var a_idx=0;function delay(){$(".buryit").removeAttr("onclick")}jQuery(document).ready((function(a){a("body").click((function(t){var e=new Array("富强","民主","文明","和谐","自由","平等","公正","法治","爱国","敬业","诚信","友善"),o=a("<span/>").text(e[a_idx]);a_idx=(a_idx+1)%e.length;var n=t.pageX,i=t.pageY;o.css({"z-index":5,top:i-20,left:n,position:"absolute","font-weight":"bold",color:"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}),a("body").append(o),o.animate({top:i-180,opacity:0},3e3,(function(){o.remove()}))})),setTimeout("delay()",2e3)}));
//# sourceMappingURL=/sm/29e1be1b129d571fa38b27b554a2941e7c80143af182baf2e157a070272cb3c1.map
		// 	var a_idx=0;
		// 	jQuery(document).ready(function($){
		// 	  addTips = function(e){
		// 		var a= new Array("走", "和我", "去看", "星星", "呀");
		// 		var i=$("<span />").text(a[a_idx]);
		// 		a_idx=(a_idx+1)%a.length;
		// 		var x=e.pageX,y=e.pageY;
		// 		i.css({
		// 		  "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
		// 		  "top":y-20,
		// 		  "left":x,
		// 		  "position":"absolute",
		// 		  "font-weight":"bold",
		// 		  "color":"#FFFACD"
		// 		});
		 
		// 		$("body").append(i);
		// 		i.animate({"top": y-180,"opacity":0},1500,function(){i.remove()})
		// 		return false;
		// 	  }
		// 	  //绑定鼠标左键
		// 	  $("body").click(addTips);
		// 	  //绑定鼠标左键
		// 	  $("body").bind("contextmenu",addTips)
		//   });