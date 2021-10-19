// SHADOW DOM
/*
   Con esta implementación podremos solucionar los problemas con los estilos css que se rescriben por temas de especificidad.
   Generando como un encapsulado, un dom independiente dentro de nuestro dom global, esto que quiere decir que todo lo que coexista en nuestro dom independiente no va existir dentro de nuestro dom global.
*/

class myElement extends HTMLElement {

   constructor() {
      // aqui bamos a inicializar todo lo que se guardara en memoria para despues agregarlo como nodos al DOM
      super()
      this.attachShadow({ mode: 'open' })

   }
   // creamos el observador de atributos de nuestro componente 
   static get observedAttributes() {
      return ["titulo", "parrafo", "img"]
   }

   // usamos uno de los ciclos de vida para validar(con el  observedAttributes) y inicializar los atributos que s ele pasara anuestro componente
   attributeChangedCallback(attr, oldval, newval) {
      // tratar de verificar en mi index.html no poner atributos ya definido sino tenemos que validar oldval con newval y recien crear el this[attr] = newval

      if (attr === "titulo") {
         this.titulo = newval

      }

      if (attr === "parrafo") {
         this.parrafo = newval

      }

      if (attr === "img") {
         this.img = newval

      }

      // this[attr] = newval
   }

   getTemplate() {

      const template = document.createElement("template")

      // alas etiquetas slot le ponemos un name para que en el html podemos agregarle a que slot quiero ponerle contenido

      template.innerHTML = /*html*/`
         <section>
            <h2>${this.titulo}</h2>
            <div>
               <p class="parrafo">${this.parrafo}</p>
            </div>
            <img src=${this.img}/>
         </section>
         ${this.getStyles()}
      `

      return template
   }

   // creamos estylos para agregarlo en el template
   getStyles() {
      return /*html*/`
         <style>

            h2{
               color:red
            }

            .parrafo{
               color:gray
            }
         
         </style>
      `
   }

   // Ahora debemos agregarlo en nuestro shadow dom que es otro contexto diferente y ya no el DOM general
   render() {
      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
   }


   // inicializes en el dom, como que si inicializamos el metodo render para que genere en el dom en el ciclo de vida especifico
   connectedCallback() {
      this.render()
   }

}

// defenimos nuestra etiqueta
customElements.define('my-element', myElement)