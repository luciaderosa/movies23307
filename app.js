/* función que va al top de la página cuando se presiona el botón flecha*/

const botonTop = document.getElementById("vuelve-arriba");
// Cuando se da scroo en  20px desde el top empieza a mostrar el botón
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    botonTop.style.display = "block";
  } else {
    botonTop.style.display = "none";
  }
}
// Click sobre botón amarillo, te lleva al comienzo del documento
function topFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // demás navegadores
}
/*------------------------------------------------------------------------------*/
// funcion para que cargue las peliculas...
window.addEventListener("load", () => {
  cargarPeliculas();
});

let pagina = 1; // variable para controla la paginacion

//capturar los botones

let btnAnterior = document.querySelector("#btnAnterior");
let btnSiguiente = document.querySelector("#btnSiguiente");
let btnPage = document.querySelector("#btnPage");

/* 
funcion boton anterior */

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    /*    pagina = pagina -1 */
    pagina -= 1;
    btnSiguiente.removeAttribute("hidden");
    //llamar a la funcion que carga la pagina
    cargarPeliculas();
  }
  if (pagina === 1) {
    btnAnterior.setAttribute("hidden", "");
  }
});

btnSiguiente.addEventListener("click", () => {
  if (pagina <= 500) {
    pagina += 1;
    btnAnterior.removeAttribute("hidden");
    //llamar a la funcion que carga la pagina
    cargarPeliculas();
  }
  if (pagina === 500) {
    btnSiguiente.setAttribute("hidden", "");
  }
});

// funcion que carga las peliculas
const cargarPeliculas = async () => {
  //   try {
  //     let respuesta = await fetch(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=fdea3f6676c2bc980b6dce243e1ee3fd&language=es-MX&page=${pagina}`
  //     );

  //     if (respuesta.status === 200) {
  //       let datos = await respuesta.json();
  //       let peliculas = "";
  //       datos.results.forEach((pelicula) => {
  //         peliculas += `<div class="pelicula">
  // <img class= "poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"  />
  // <h3 class= "titulo">${pelicula.title}</h3>
  // </div>`;
  //       });
  //       document.querySelector(".contenedor").innerHTML = peliculas;
  //       btnPage.textContent = `Página: ${pagina.toString()}`;
  //     } else if (respuesta.status === 404) {
  //       console.log("la pagina no existe");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  try {
    let datos = await axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=fdea3f6676c2bc980b6dce243e1ee3fd&language=es-MX&page=${pagina}`
    );
    
    if (datos.status === 200) {
      let peliculas = "";
      datos.data.results.forEach((pelicula) => {
        peliculas += `<div class="pelicula">
<img class= "poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}"  />
<h3 class= "titulo">${pelicula.title}</h3>
</div>`;
      });
      document.querySelector(".contenedor").innerHTML = peliculas;
      btnPage.textContent = `Página: ${pagina.toString()}`;
    } else if (respuesta.status === 404) {
      console.log("la pagina no existe");
    }
  } catch (error) {
    console.log(error);
  }
};
