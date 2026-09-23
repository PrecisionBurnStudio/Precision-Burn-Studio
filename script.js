const SUPABASE_URL = "https://novkaqylwqdtwceypyrk.supabase.co/rest/v1/";
const SUPABASE_KEY = "Sb_publishable_XCShczpfe0WhoNWuUYgGug_-M9o_c0t";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

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

console.log("Precision Burn Studio: Supabase connection loaded");
console.log("Supabase client:", supabaseClient);
