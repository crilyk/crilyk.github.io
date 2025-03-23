
var l=document.querySelector('.gutter pre')
var r=document.querySelector('.code pre')
r.addEventListener('scroll',function(){
  l.scrollTop = r.scrollTop
})