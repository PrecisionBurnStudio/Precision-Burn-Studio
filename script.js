const h=document.querySelector('.hamburger'),n=document.querySelector('.nav');
if(h&&n){
  h.addEventListener('click',()=>{
    const open=n.classList.toggle('open');
    h.setAttribute('aria-expanded',open?'true':'false');
  });
  n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    n.classList.remove('open');
    h.setAttribute('aria-expanded','false');
  }));
}
