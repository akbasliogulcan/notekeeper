// ! Ay Dizisi
const months = [
           "January",
           "February",
           "March",
           "April",
           "May",
           "June",
           "July",
           "August",
           "September",
           "October",
           "November",
           "December",
];





//*Elemanları js e çekk
const addBox = document.querySelector(".add-box");
const popupBoxContainer = document.querySelector(".popup-box");
const popupBox = document.querySelector(".popup");
const closeBtn = document.querySelector("#close-btn");
const form = document.querySelector("form");



//*notları locale storage dan çekme
let notlar = JSON.parse(localStorage.getItem("notes")) || [];


addBox.addEventListener("click", () => {
           popupBoxContainer.classList.add("show");
           popupBox.classList.add("show");


           // addnewnote tıklanıldığında arka planı sabit tutar.
           document.querySelector("body").style.overflow = "hidden";
});


closeBtn.addEventListener("click", () => {
           // addnewnote açıldığında kapatmak için çarpıyı aktifleştirir.
           popupBoxContainer.classList.remove("show");
           popupBox.classList.remove("show");

           //? addnewnote tıklanıldığında arka planı sabit tuttuğu içinsonrasında tekrar ana ekrana geldiğimiz de sabit kalır ve bunu auto ile düzeltiriz.
           document.querySelector("body").style.overflow = "auto";


});

// watch the form  bein submitted 
form.addEventListener("submit", (e) => {
           // formun sayfa yenilemesini engelle
           e.preventDefault();
           console.log(e);
           // formun içindeki inputlara eriş
           const titleInput = e.target[0]
           const descriptionInput = e.target[1]

           let title = titleInput.value.trim();
           let description = descriptionInput.value.trim();
           //* trim() baştaki ve sondaki boşlukları siler.
           console.log(title, description);

           //*boş bırakılırsa uyarı ver
           if (!title && !description) {
                      alert("Başlık ve açıklamadan herhangi biri boş bırakılamaz!");
                      return;  //*kodun devam etmesini engeller.
           }
           console.log("form submitted");

           const date = new Date();
           const day = date.getDate();
           const month = months[date.getMonth()];
           const year = date.getFullYear();
           const id = date.getTime(); // her not için benzersiz id oluşturur.

           let noteInfo = {
                      id,
                      title,
                      description,
                      date: `${month} ${day}, ${year}`,
           };

           //*noteinfo yu notlar dizisine ekle
           notlar.push(noteInfo);
           localStorage.setItem("notes", JSON.stringify(notlar));
           // //*locale Storage eleman ekleme ,sayfa yenilesende gitmez
           // localStorage.setItem("notes", JSON.stringify(noteInfo));

           //* add note dediğimizde içeriği temizle
           titleInput.value = "";
           descriptionInput.value = "";
           //*formu kapat
           popupBoxContainer.classList.remove("show");
           popupBox.classList.remove("show");
           document.querySelector("body").style.overflow = "auto";

           // //*Locale Storage eleman ekleme
           // const users = ["Ayşe", "Adem", "Beril", "Oğulcan"];
           // localStorage.setItem("usersss", JSON.stringify(users));
           // users bir dizi veya nesne olduğu için direkt olarak kaydedilemez.JSON.stringify onu string’e çevirir,

           // //*localeStorage dan eleman çekme
           // console.log(JSON.parse(localStorage.getItem("usersss")));




});

