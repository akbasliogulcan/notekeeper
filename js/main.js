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
const wrapper = document.querySelector(".wrapper");
console.log(wrapper);



//*notları locale storage dan çekme daha önce yazılan notlar burada depolanır
//* ve ilk etapda bu notları alırız çünkü daha sonrasında sayfada gözükmesini isteyebiliriz.
let notes = JSON.parse(localStorage.getItem("notes")) || [];

//*sayfanın yüklendiğini dinle
document.addEventListener("DOMContentLoaded", () => {
           //*Sayfa yüklendiğinde notları render eden  fonksiyonu çağır

           renderNotes(notes);
});


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

           console.log(noteInfo);
           //*noteinfo yu notlar dizisine ekle
           notes.push(noteInfo);
           localStorage.setItem("notes", JSON.stringify(notes));
           // //*locale Storage eleman ekleme ,sayfa yenilesende gitmez
           // localStorage.setItem("notes", JSON.stringify(noteInfo));

           //* add note dediğimizde içeriği temizle
           titleInput.value = "";
           descriptionInput.value = "";
           //*formu kapat
           popupBoxContainer.classList.remove("show");
           popupBox.classList.remove("show");
           document.querySelector("body").style.overflow = "auto";
           //*notları  render et
           renderNotes(notes);

           // //*Locale Storage eleman ekleme
           // const users = ["Ayşe", "Adem", "Beril", "Oğulcan"];
           // localStorage.setItem("usersss", JSON.stringify(users));
           // users bir dizi veya nesne olduğu için direkt olarak kaydedilemez.JSON.stringify onu string’e çevirir,

           // //*localeStorage dan eleman çekme
           // console.log(JSON.parse(localStorage.getItem("usersss")));




});

//*notları arayüze render eden fonskiyon
function renderNotes(notes) {
           //?her render etme işleminde önceki notları siler
           document.querySelectorAll(".note").forEach(note => note.remove());


           //*note dizisindeki herbir eleman için birer note kartı oluştur.
           notes.forEach((note) => {
                      let noteEleman = ` <li class="note" data-id=${note.id}>
                                 <!-- Note Details -->
                                 <div class="details">
                                            <!-- Title and Description -->
                                            <p class="title">${note.title}</p>
                                            <p class="description">${note.description}</p>
                                 </div>
                                 <!-- Bottom -->
                                 <div class="bottom">
                                            <span>${note.date}</span>
                                            <div class="settings">
                                                       <i class="bx bx-dots-horizontal-rounded"></i>
                                                       <!-- Menu -->
                                                       <ul class="menu">
                                                                  <li class="editIcon"><i class="bx bx-edit"></i> Edit</li>
                                                                  <li class="deleteIcon"><i class="bx bx-trash-alt"></i> Delete</li>
                                                       </ul>

                                            </div>
                                 </div>
                      </li>`
                      //*aşağıda addBox un hemen sonrasına ekle
                      //*insertAdjacentHTML() metodu, belirli bir konuma HTML metni ekler.
                      addBox.insertAdjacentHTML("afterend", noteEleman);
           });
}


function showMenu(eleman) {
           //dışarıdan gelen elemanın  kapsayıcısına show clasını ekleme   "eleman =(e.target)"
           eleman.parentElement.classList.add("show"); //!parentElement bir elemanın kapsayıcsına erişmek için settings kısmı
           //eklenen show clasını 3 nokta haricinde bir yere tıklanırsa kaldır
           document.addEventListener("click", (e) => {

                      //*tıklanılan yer i etiketinin (... nokta ) dışında bir yer ise kaldır.
                      if (e.target.tagName != "I" || e.target != eleman) {
                                 eleman.parentElement.classList.remove("show");
                      };
           });
}

//!wrapper kısmındaki tıklamaları izle
wrapper.addEventListener("click", (e) => {
           //?eğer tıklanan eleman settings ise
           if (e.target.classList.contains("bx-dots-horizontal-rounded")) {

                      //e.targetı show clasına parametre olarak geçiyoruz.
                      //e target demekte 3 noktaya tıklamak demek
                      showMenu(e.target);
           }
           //Eğer sil butonuna tıklanrsa
           else if (e.target.classList.contains("deleteIcon")) {
                      const res = confirm("Silmek istediğinize emin misiniz?");

                      //*silme işlemi kabul edildiyse
                      if (res) {

                      }

           };
});
