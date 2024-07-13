(() => {
  // Designed By Mete Furkan Okumuş
  // Bu proje, Anında Çalışan Fonksiyon İfadesi (Immediately Invoked Function Expression - IIFE) kullanılarak yazılmıştır.
  //****************************************************************************************************************************
  // Başlangıç Fonksiyonu
  const init = () => {
    let startingTime = new Date().getTime();

    // Script oluşturma ve jquery js dosyasına import etme
    let script = document.createElement("SCRIPT");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);

    // JQuery başarılı bi şekilde yüklendi mi kontrolü
    let checkReady = function (callback) {
      if (window.jQuery) {
        callback(jQuery);
      } else {
        window.setTimeout(function () {
          console.log( "callback yapısı => " , callback);
          checkReady(callback);
        }, 20);
      }
    };

    // JQuery i yükleyen fonksiyon
    checkReady(function ($) {
      $(function () {
        let endingTime = new Date().getTime();
        buildHTML();
        buildCSS();
        setEvents();
        let tookTime = endingTime - startingTime;
        console.log("jQuery is loaded after " + tookTime + " ms!");
      });
    });
  };

  //****************************************************************************************************************************

  // HTML Kodları
  const buildHTML = () => {
    // product-detal class ismine sahip bir div oluşturma işlemi
    const productDetail = document.createElement("div");
    productDetail.className = "product-detail";
    document.getElementsByTagName("body")[0].appendChild(productDetail);

    const html = `
        <div class="container">
          <h5>(Designed By Mete Furkan Okumus)</h5>
          <h2>You Might Also Like</h2>
          <div class="carousel">
              <!-- Ürün kartları buraya eklenecek -->
          </div>
          <button class="carousel-prev-btn"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="carousel-next-btn"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      `;
    $(".product-detail").after(html);
  };

  //****************************************************************************************************************************

  // CSS Kodları
  const buildCSS = () => {
    const css = `
      @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap");
        .container {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
            position: relative; 
            font-family: "Noto Sans", sans-serif;
            max-width: 100%; 
            overflow: hidden; 
            margin-left: auto; 
            margin-right: auto; 

        }
        .carousel {
            display: flex;
            overflow: hidden; 
            scroll-snap-type: x mandatory; 
            -webkit-overflow-scrolling: touch;
            transition: transform 2s ease;
            scroll-behavior: smooth;
        }
        .product-card {
            position: relative; 
            flex: 0 0 auto;
            width: 200px;
            margin-right: 10px;
            scroll-snap-align: start;
            background-color: #fff;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            padding: 10px;
            cursor: pointer;
            padding-bottom: 45px; 
            text-align: left;
        }
        .product-card img {
            max-width: 100%;
            height: auto;
            cursor:pointer
        }
        .product-card h3 {
            font-size: 13px;
            font-weight: 300;
            margin-bottom: 1px;
            cursor:pointer
        }
        .product-card h3:hover {  
            color:blue
        }
        .product-card p {
            position: absolute;
            font-size: 14px;
            font-weight: bold;
            color: #888;
            color:#2F539B
        }
        .carousel-prev-btn, .carousel-next-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fff;
            border: none;
            cursor: pointer;
            font-size: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            z-index: 1;
        }
        .carousel-prev-btn {
            left: 10px;
        }
        .carousel-next-btn {
            right: 10px;
        }
        .favorite-btn {
          position: absolute;
          top: 18px;
          right: 20px;
          color: grey; 
          background-color: #ffff; 
          padding: 5px;
          border-radius: 20%; 
          border: 1px solid grey;
          cursor: pointer;
          font-size: 20px;
          z-index:1000;
        }
        .favorite-btn.favorited {
            color: blue;
        }
        
        /* Responsive stil - 1200px ve altı */
      @media (max-width: 1200px) {
        .product-card {
        width: 180px;
        }
      }

      /* Responsive stil - 992px ve altı */
      @media (max-width: 992px) {
          .product-card {
              width: 160px;
          }
      }

      /* Responsive stil - 768px ve altı */
      @media (max-width: 768px) {
          .product-card {
              width: auto;
              margin-bottom: 20px;
              margin-right: 0;
              font-size: 13px;
          }
          .carousel {
              flex-direction: column;
              align-items: center;
              justify-content:center;
          }
      }

      /* Responsive stil - 600px ve altı */
      @media (max-width: 600px) {
          .product-card {
              width: auto;
              margin-bottom: 10px;
              margin-right: 0;
          }
          .carousel {
              flex-direction: column;
              align-items: center;
          }
      }

      /* Responsive stil - 480px ve altı */
      @media (max-width: 480px) {
          .product-card {
              width: auto;
              margin-bottom: 10px;
              margin-right: 0;
              
          }
          .carousel {
            flex-direction: column;
            align-items: center;
          }
          .carousel-prev-btn, .carousel-next-btn {
              display: none; /* Ok tuşlarını gizle */
          }
      }

      `;
    $("<style>").addClass("carousel-style").html(css).appendTo("head");
  };

  //*******************************************************************************************************************************

  // setEvents Kodları / Tüm metodlar
  const setEvents = () => {
    // API'den AJAX yardımı ile GET metodunu kullanarak veri çekme işlemi
    const apiUrl =
      "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

    $.ajax({
      url: apiUrl,
      type: "GET",
      success: (response) => {
        const products = JSON.parse(response);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(products);
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });

    /////////////////////////////////////////////////////////////////////////////
    //Font-Awesome (favorileme iconu için) kütüphanesini import etme bölümü
    const addFontAwesome = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
      link.integrity =
        "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==";
      link.crossOrigin = "anonymous";
      link.referrerPolicy = "no-referrer";

      document.head.appendChild(link);
    };
    // importu tetikleme
    addFontAwesome();
    /////////////////////////////////////////////////////////////////////////////
    // İlgili ürünü favori ekleme bölümü
    $(document).on("click", ".favorite-btn", function () {
      // document içerisinde ".favorite-btn" sınıfına ait herhangi bi elemente tıklama eventi
      $(this).toggleClass("favorited"); // Favori butonuna "favorited" sınıfını ekler veya kaldırır
      const productId = $(this).parent().data("product-id"); // Ürün ID'sini alır
      const isFavorited = $(this).hasClass("favorited"); // Butonun favori olup olmadığını kontrol eder (favorited ise true değilse false)
      updateFavorite(productId, isFavorited); // Favori durumunu güncelleme fonksiyonu çağrılır
    });
    /////////////////////////////////////////////////////////////////////////////
    // Ürün id si ve favori bilgisini alıp local storage yi update eden fonksiyon bölümü
    const updateFavorite = (productId, isFavorited) => {
      // localStorage'dan ürünler ve favori ID'leri alınır, eğer yoksa boş dizi atanır
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

      // Favori butonuna basılan ürünün dizideki index'i bulunur
      const productIndex = storedProducts.findIndex((p) => p.id === productId);

      // Ürün bulunduysa işleme devam edilir
      if (productIndex !== -1) {
        let favoriteIds = JSON.parse(localStorage.getItem("favoriteIds")) || [];

        // Eğer ürün favoriye eklenmişse kontrol et
        if (isFavorited) {
          // Favori id'si yoksa ekle
          if (!favoriteIds.includes(productId)) {
            favoriteIds.push(productId);
          }
        } else {
          // Ürün favoriden çıkarılacaksa, favori ID'si favori ID'lerinden filtrelenir
          favoriteIds = favoriteIds.filter((id) => id !== productId);
        }

        // Güncellenen favori ID'leri localStorage'e kaydedilir
        localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));

        // Ürünün favori durumu güncellenir ve localStorage'e tekrar kaydedilir
        // storedProducts[productIndex].favorited = isFavorited;
        // localStorage.setItem("products", JSON.stringify(storedProducts));
      }
    };
    /////////////////////////////////////////////////////////////////////////////
    // Karoseli kaydırma kontrolü
    const slideCarousel = (direction) => {
      const carousel = $(".carousel");
      const scrollAmount = direction === "left" ? -220 : 220; // Kaydırma miktarı
      const currentScrollLeft = carousel.scrollLeft(); // Mevcut kaydırma konumu
      carousel.animate({ scrollLeft: currentScrollLeft + scrollAmount }, 5); // Kaydırma animasyonu
    };
    /////////////////////////////////////////////////////////////////////////////
    //Ok tuşu ile Sola yönlendirme
    $(document).on("click", ".carousel-prev-btn", () => {
      slideCarousel("left");
    });

    //Ok tuşu ile Sağa yönlendirme
    $(document).on("click", ".carousel-next-btn", () => {
      slideCarousel("right");
    });
    /////////////////////////////////////////////////////////////////////////////
    // Ürünlere tıklandığı zaman ilgili ürünün bilgilerini bulan ve return eden fonksiyon
    const getProductById = (productId) => {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      return storedProducts.find((p) => p.id === productId);
    };
    /////////////////////////////////////////////////////////////////////////////
    // Ürün detay sayfasını yeni sekmede açma işlemi
    $(document).on("click", ".product-card", function (e) {
      const target = $(e.target); //e.target öğesini jquery nesnesine dönüştürme ve target değişkenine atama
      console.log(target);
      // Eğer favori ikonuna tıklanıldıysa veya favori butonu içinde bir elemente tıklanıldıysa, işlem yapma
      if (
        target.is(".favorite-btn") || // seçilen öğe favorite-btn sınıfına sahipse
        target.closest(".favorite-btn").length > 0 //seçilen öğenin bir üst parent ı favorite-btn sınıfına sahipse 1 değilse null döndürür
      ) {
        return;
      }
      const productId = $(this).data("product-id");
      const product = getProductById(productId);
      if (product && product.url) {
        window.open(product.url, "_blank");
      }
    });
    /////////////////////////////////////////////////////////////////////////////
    // Ürünleri listeleme bölümü
    const displayProducts = (products) => {
      const carousel = $(".carousel");
      carousel.empty(); // Önce içeriği temizle
      products.forEach((product) => {
        const ids = JSON.parse(localStorage.getItem("favoriteIds"));
        const isFavorited = ids?.find((id) => id === product.id)
          ? "favorited"
          : "";
        const productCard = $("<div>")
          .addClass("product-card")
          .attr("data-product-id", product.id)
          .append($("<img>").attr("src", product.img).attr("alt", product.name))
          .append(
            $("<button>")
              .addClass("favorite-btn")
              .addClass(isFavorited)
              .append($("<i>").addClass("fas fa-heart"))
          )
          .append($("<h3>").text(product.name))
          .append($("<p>").text(`${product.price} TRY`));
        carousel.append(productCard);
      });
    };
  };
  //***************************************************************************************************************************
  // initial fonksiyonu ile başlama bölümü
  init();
})();
