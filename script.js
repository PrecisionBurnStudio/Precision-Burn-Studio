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
// ==========================================
// PRECISION BURN STUDIO CUSTOMER ORDER SUBMISSION
// ==========================================

const customerOrderForm = document.querySelector(".order-form");

if (customerOrderForm) {
  let orderSubmitting = false;

  customerOrderForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (orderSubmitting) return;

    const submitButton = customerOrderForm.querySelector(
      'button[type="submit"]'
    );

    const captchaField = customerOrderForm.querySelector(
      'input[name="cf-turnstile-response"]'
    );

    const captchaToken = captchaField ? captchaField.value : "";

    if (!captchaToken) {
      alert("Please complete the security check before submitting.");
      return;
    }

    orderSubmitting = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "SUBMITTING YOUR PROJECT...";
    }

    const storageKey = "pbs_customer_submission_id";

    let submissionId = sessionStorage.getItem(storageKey);

    if (!submissionId) {
      submissionId = crypto.randomUUID();
      sessionStorage.setItem(storageKey, submissionId);
    }

    try {
      const formData = new FormData(customerOrderForm);

      const customerData = {
        submissionId: submissionId,
        captchaToken: captchaToken,

        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        product: formData.get("product"),
        details: formData.get("details"),
        engraving: formData.get("engraving"),
        quantity: formData.get("quantity") || 1,
        size: formData.get("size"),
        material: formData.get("material"),
        budget: formData.get("budget"),
        referral: formData.get("referral"),
        deadline: formData.get("deadline"),

        estimate_product: formData.get("estimate_product"),
        estimate_complexity: formData.get("estimate_complexity"),
        estimate_length: formData.get("estimate_length"),
        estimate_width: formData.get("estimate_width"),
        estimate_quantity: formData.get("estimate_quantity"),
        estimate_personalization: formData.get("estimate_personalization"),
        estimate_unit_price: formData.get("estimate_unit_price"),
        estimate_total: formData.get("estimate_total")
      };

      // FIRST: Create or retrieve the quote in Supabase.
      const { data, error } = await supabaseClient.functions.invoke(
        "submit-customer-order",
        { body: customerData }
      );

      if (error || !data || !data.success) {
        throw new Error(
          data?.error || error?.message || "Unable to save your request."
        );
      }

      // SECOND: Send the original form, including uploaded files, to Formspree.
      const formspreeResponse = await fetch(customerOrderForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!formspreeResponse.ok) {
        throw new Error(
          "Your quote request was saved, but the email notification could not be sent. Please try submitting again."
        );
      }

      // SUCCESS
      sessionStorage.removeItem(storageKey);

      if (submitButton) {
        submitButton.textContent = "PROJECT SUBMITTED SUCCESSFULLY";
      }

      alert(
        "Thank you! Your custom project request has been submitted.\n\n" +
        "Your reference number is: " + data.quote_number +
        "\n\nWe will review your project and contact you with a quote."
      );

    } catch (error) {
      console.error("Customer order submission error:", error);

      alert(error.message || "Something went wrong. Please try again.");

      if (window.turnstile) {
        window.turnstile.reset();
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "SUBMIT MY CUSTOM PROJECT";
      }

    } finally {
      orderSubmitting = false;
    }
  });
}

// ==========================================
// END CUSTOMER ORDER SUBMISSION
// ==========================================
