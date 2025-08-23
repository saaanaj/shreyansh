// const imagechange = document.querySelector("#imgchange");
// const h4texchng = document.querySelector("#h4textchange");
// const h4span = document.querySelector("#h4span");
// const ptextchange = document.querySelector("#ptextchange");
// const rptday = document.querySelector("#rptday");
// const dispcchange = document.querySelector("#dispcchange");
// const orgprice = document.querySelector("#orgprice");
// const discountlabel = document.querySelector("#discountlabel");

// async function updateFromAPI() {
//   try {
//     const response = await fetch("https://crubapi.vercel.app/api/tests");
//     const data = await response.json();
//     const test = data[0];
//     imagechange.src = test.image;
//     h4texchng.childNodes[0].nodeValue = test.title + " "; 
//     h4span.textContent = test.spanText;
//     ptextchange.textContent = test.description;
//     rptday.textContent = test.reportTime;
//     dispcchange.childNodes[1].nodeValue = test.discountedPrice;
//     orgprice.childNodes[2].nodeValue = test.originalPrice;
//     discountlabel.childNodes[0].nodeValue = test.discount; 

//   } catch (err) {
//     console.error("API error:", err);
//   }
// }

// updateFromAPI();



// const secImage = document.querySelector("#secImage");
// const secTitle = document.querySelector("#secTitle");
// const secSpan = document.querySelector("#secSpan");
// const secDesc = document.querySelector("#secDesc");
// const secReport = document.querySelector("#secReport");
// const secDisPrice = document.querySelector("#secDisPrice");
// const secOrgPrice = document.querySelector("#secOrgPrice");
// const secDiscountLabel = document.querySelector("#secDiscountLabel");

// function updateSecondCard() {
//   secImage.src = "https://images.unsplash.com/photo-1755826525115-40dc08fcd1db?q=80&w=688&auto=format&fit=crop";
//   secTitle.childNodes[0].nodeValue = "Kidney Function Test (KFT) "; 
//   secSpan.textContent = "TEST";
//   secDesc.textContent = "Get your Kidney and Liver tests done safely with our certified labs.";
//   secReport.textContent = "report 12 hours";
//   secDisPrice.childNodes[1].nodeValue = "600";   
//   secOrgPrice.childNodes[1].nodeValue = "1000";  
//   secDiscountLabel.childNodes[0].nodeValue = "40";
// }

// updateSecondCard();



// const thirdImage = document.querySelector("#thirdmage");
// const thirdTitle = document.querySelector("#thirdTitle");
// const thirdSpan = document.querySelector("#thirdSpan");
// const thirdDesc = document.querySelector("#thirdDesc");
// const thirdReport = document.querySelector("#thirdReport");
// const thirdDisPrice = document.querySelector("#thirdDisPrice");
// const thirdOrgPrice = document.querySelector("#thirdOrgPrice");
// const thirdDiscountLabel = document.querySelector("#thirdDiscountLabel");

// function updateThirdCard() {
//   thirdImage.src = "https://images.unsplash.com/photo-1755826525115-40dc08fcd1db?q=80&w=688&auto=format&fit=crop";
//   thirdTitle.childNodes[0].nodeValue = "Thyroid Function Test (TFT) ";
//   thirdSpan.textContent = "TEST";
//   thirdDesc.textContent = "Check your thyroid health quickly and safely with our certified labs.";
//   thirdReport.textContent = "report 24 hours";
//   thirdDisPrice.childNodes[1].nodeValue = "700";   
//   thirdOrgPrice.childNodes[1].nodeValue = "1200";  
//   thirdDiscountLabel.childNodes[0].nodeValue = "42";
// }

// updateThirdCard();



// ---- FIRST CARD ----
const imagechange = document.querySelector("#imgchange");
const h4texchng = document.querySelector("#h4textchange");
const h4span = document.querySelector("#h4span");
const ptextchange = document.querySelector("#ptextchange");
const rptday = document.querySelector("#rptday");
const dispcchange = document.querySelector("#dispcchange");
const orgprice = document.querySelector("#orgprice");
const discountlabel = document.querySelector("#discountlabel");

// ---- SECOND CARD ----
const secImage = document.querySelector("#secImage");
const secTitle = document.querySelector("#secTitle");
const secSpan = document.querySelector("#secSpan");
const secDesc = document.querySelector("#secDesc");
const secReport = document.querySelector("#secReport");
const secDisPrice = document.querySelector("#secDisPrice");
const secOrgPrice = document.querySelector("#secOrgPrice");
const secDiscountLabel = document.querySelector("#secDiscountLabel");

// ---- THIRD CARD ----
const thirdImage = document.querySelector("#thirdmage");
const thirdTitle = document.querySelector("#thirdTitle");
const thirdSpan = document.querySelector("#thirdSpan");
const thirdDesc = document.querySelector("#thirdDesc");
const thirdReport = document.querySelector("#thirdReport");
const thirdDisPrice = document.querySelector("#thirdDisPrice");
const thirdOrgPrice = document.querySelector("#thirdOrgPrice");
const thirdDiscountLabel = document.querySelector("#thirdDiscountLabel");


// ---- UPDATE FUNCTION ----
async function updateFromAPI() {
  try {
    const response = await fetch("https://crubapi.vercel.app/api/tests");
    const data = await response.json();

    // first card
    const test1 = data[0];
    imagechange.src = test1.image;
    h4texchng.childNodes[0].nodeValue = test1.title + " ";
    h4span.textContent = test1.spanText;
    ptextchange.textContent = test1.description;
    rptday.textContent = test1.reportTime;
    dispcchange.childNodes[1].nodeValue = test1.discountedPrice;
    orgprice.childNodes[2].nodeValue = test1.originalPrice;
    discountlabel.childNodes[0].nodeValue = test1.discount;

    // second card
    const test2 = data[1];
    secImage.src = test2.image;
    secTitle.childNodes[0].nodeValue = test2.title + " ";
    secSpan.textContent = test2.spanText;
    secDesc.textContent = test2.description;
    secReport.textContent = test2.reportTime;
    secDisPrice.childNodes[1].nodeValue = test2.discountedPrice;
    secOrgPrice.childNodes[1].nodeValue = test2.originalPrice;
    secDiscountLabel.childNodes[0].nodeValue = test2.discount;

    // third card
    const test3 = data[2];
    thirdImage.src = test3.image;
    thirdTitle.childNodes[0].nodeValue = test3.title + " ";
    thirdSpan.textContent = test3.spanText;
    thirdDesc.textContent = test3.description;
    thirdReport.textContent = test3.reportTime;
    thirdDisPrice.childNodes[1].nodeValue = test3.discountedPrice;
    thirdOrgPrice.childNodes[1].nodeValue = test3.originalPrice;
    thirdDiscountLabel.childNodes[0].nodeValue = test3.discount;

  } catch (err) {
    console.error("API error:", err);
  }
}

updateFromAPI();




document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".navmenu");
  const navList = document.querySelector(".navitems ul");

  menuIcon.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
});
