const texto = document.getElementById("txtaCifrar");
const textoCifrado = document.getElementById("txtCifrado");
const desplazamiento = document.getElementById("desplazamiento");
const clave = document.getElementById("Clave");    
const divCesar = document.getElementById("aCesar");
const divVigenere = document.getElementById("aViggenere");
const btnCifrar = document.getElementById("btnCifrar");
const btnDescifrar = document.getElementById("btnDescifrar");

document.addEventListener("DOMContentLoaded", function () 
{
    btnCifrar.addEventListener("click", function()
    {
        const textodado = texto.value;
        if (divCesar.style.display === "block")
        {
            const desp = parseInt(desplazamiento.value);
            textoCifrado.value = cifradoCesar(textodado, desp);
        }
        else
        {
            const clavedada = clave.value;
            textoCifrado.value = cifradoViggenere(textodado, clavedada);
        }
    });

    btnDescifrar.addEventListener("click", function()
    {
        const textodado = texto.value;
        if (divCesar.style.display === "block")
        {
            const desp = parseInt(desplazamiento.value);
            textoCifrado.value = descifradoCesar(textodado, desp);
        }
        else
        {
            const clavedada = clave.value;
            textoCifrado.value = descifradoViggenere(textodado, clavedada);
        }
    });
});

    function doCesar()
    {
        divCesar.style.display = "block";
        divVigenere.style.display = "none";
    }

    function doViggenere()
    {
        divCesar.style.display = "none";
        divVigenere.style.display = "block";
    }

    function cifradoCesar(texto, desplazamiento)
    {
        if (typeof texto !== 'string' || typeof desplazamiento !== 'number') {
            return "Por favor, ingresa un texto y un número de desplazamiento válidos.";
          }
          desplazamiento = desplazamiento % 26;
          let textoCifrado = "";
          for (let i = 0; i < texto.length; i++) {
            let c = texto[i];
            if (c.match(/[a-z]/i)) {
              let charCode = texto.charCodeAt(i);
              let base = charCode < 91 ? 65 : 97;
              c = String.fromCharCode(((charCode - base + desplazamiento) % 26) + base);
            }
            textoCifrado += c;
          }
          return textoCifrado;
    }

    function descifradoCesar(textoCifrado, desplazamiento)
    {
        if (typeof textoCifrado !== 'string' || typeof desplazamiento !== 'number') {
            return "Por favor, ingresa un texto cifrado y un número de desplazamiento válidos.";
          }
          desplazamiento = desplazamiento % 26;
          let textoDescifrado = "";
          for (let i = 0; i < textoCifrado.length; i++) {
            let c = textoCifrado[i];
            if (c.match(/[a-z]/i)) {
              let charCode = textoCifrado.charCodeAt(i);
              let base = charCode < 91 ? 65 : 97;
              c = String.fromCharCode(((charCode - base - desplazamiento + 26) % 26) + base);
            }
            textoDescifrado += c;
          }
          return textoDescifrado;
    }

    function cifradoViggenere(texto, clave)
    {
        if(clave.length > texto.length){
            alert("La clave no puede ser mas larga que el texto a cifrar");
        }else{
            return codeViggenere(texto, clave);
        }
    }
    
    function codeViggenere(texto, clave)
    {
        if (typeof texto !== 'string' || typeof clave !== 'string') {
            return "Por favor, ingresa un texto y una clave válidos.";
          }
        
          const textoUpper = texto.toUpperCase();
          const claveUpper = clave.toUpperCase();
          const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let textoCifrado = "";
        
          for (let i = 0; i < textoUpper.length; i++) {
            const c = textoUpper[i];
            if (c.match(/[A-Z]/)) {
              const textoCharCode = c.charCodeAt(0) - 65;
              const claveCharCode = claveUpper.charCodeAt(i % claveUpper.length) - 65;
              const cifradoCharCode = (textoCharCode + claveCharCode) % 26;
              const cifradoChar = abc.charAt(cifradoCharCode);
              textoCifrado += cifradoChar;
            } else {
              textoCifrado += c;
            }
          }
          return textoCifrado;
    }

    function descifradoViggenere(textoCifrado, clave)
    {
        if(clave.length > texto.length){
            alert("La clave no puede ser mas larga que el texto a cifrar");
        }else{
            return decodeViggenere(textoCifrado, clave);
        }
    }

    function decodeViggenere(textoCifrado, clave)
    {
        if (typeof textoCifrado !== 'string' || typeof clave !== 'string') {
            return "Por favor, ingresa un texto cifrado y una clave válidos.";
          }
        
          const textoCifradoUpper = textoCifrado.toUpperCase();
          const claveUpper = clave.toUpperCase();
          const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let textoDecifrado = "";
        
          for (let i = 0; i < textoCifradoUpper.length; i++) {
            const c = textoCifradoUpper[i];
            if (c.match(/[A-Z]/)) {
              const textoCifradoCharCode = c.charCodeAt(0) - 65;
              const claveCharCode = claveUpper.charCodeAt(i % claveUpper.length) - 65;
              const decifradoCharCode = (textoCifradoCharCode - claveCharCode + 26) % 26; // Resta el desplazamiento
              const decifradoChar = abc.charAt(decifradoCharCode);
              textoDecifrado += decifradoChar;
            } else {
              textoDecifrado += c;
            }
          }
          return textoDecifrado;
    }

    function colocar()
    {
        const cifradocopy = textoCifrado.value;
        texto.value = cifradocopy;
    } 

    function reiniciar(){
        texto.value = "";
        textoCifrado.value = "";
        desplazamiento.value="1"
        clave.value = "";
    }