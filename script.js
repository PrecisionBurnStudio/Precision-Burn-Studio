const SUPABASE_URL = "https://novkaqylwqdtwceypyrk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdmthcXlsd3FkdHdjZXlweXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMDk5NDMsImV4cCI6MjEwNTU4NTk0M30.5byp2I56KsiZ9NceDOBBUgTK_e5oR3P9It8lABbgd8M";

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
