!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {

        const arr_registros = JSON.parse(localStorage.getItem("todos")) || []
 
        // INICIO DE LOGIN

        const main_form = d.getElementById("mainForm"), user = d.getElementById("user"), pass = d.getElementById("pass")
        const userJS = "root", passJS = "123";

        if (main_form) 
        {
            main_form.addEventListener("submit", (e)=> 
            {
                e.preventDefault();
                if ( user.value.trim() == userJS && pass.value.trim() == passJS )  location.replace("inicio.html")                
                else alert("Datos incorrectos")
    
            });    
        }
        
        // FIN DE LOGIN  



        // INICIO DE REGISTRAR TRAMITE

        const $temp_table = d.getElementById("temp_table").content
        const $formInicio = d.getElementById("formInicio")
        const $bodyTable = d.getElementById("bodyTable")
        const fragmento = d.createDocumentFragment()
        let cadena = ""
        let jason
        let trucoB = false
        let indice = null
        let todoStrings

        const exampleModal = d.getElementById("exampleModal")
    
     
        if (arr_registros.length > 0) 
        {
            showItems(arr_registros)     
        }
 
        $formInicio.addEventListener("submit", (e)=> 
        {
            e.preventDefault()

            if (trucoB) 
            {
                const data = new FormData($formInicio)
         
                cadena = '{'
                for (const [llave, value] of data) 
                {
                    cadena +=  `"${llave}" :   "${value}",`
                    //   jason = { [llave] : value}
                }
                cadena += '}'  
    
                cadena = cadena.slice(0, -2) + "}"
                jason = JSON.parse(cadena)
                
                arr_registros.push(jason)
                
            }
            else
            {
               arr_registros[indice].codigo =  exampleModal.querySelector("#codigo").value
               arr_registros[indice].descripcion =  exampleModal.querySelector("#descripcion").value
               arr_registros[indice].fechaRegistro =  exampleModal.querySelector("#fechaRegistro").value
               arr_registros[indice].cod_director =  exampleModal.querySelector("#cod_director").value
               arr_registros[indice].nombre_director =  exampleModal.querySelector("#nombre_director").value
               arr_registros[indice].apellido_director =  exampleModal.querySelector("#apellido_director").value
               arr_registros[indice].dni_director =  exampleModal.querySelector("#dni_director").value
               arr_registros[indice].codigo_iiee =  exampleModal.querySelector("#codigo_iiee").value
               arr_registros[indice].nombre_iiee =  exampleModal.querySelector("#nombre_iiee").value
               arr_registros[indice].direccion_iiee =  exampleModal.querySelector("#direccion_iiee").value
            }
            
           

            $formInicio.reset()
            showItems(arr_registros) 
        });



    function cleanTable() 
    {
        while ($bodyTable.firstChild)  $bodyTable.removeChild($bodyTable.firstChild)    
    }


    function showItems(arr) 
    {
        todoStrings = JSON.stringify(arr)
        localStorage.setItem("todos", todoStrings)
        
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".cod").textContent = item.codigo
            clone.querySelector(".des").textContent = item.descripcion
            clone.querySelector(".fec").textContent = item.fechaRegistro
            clone.querySelector(".cod_dire").textContent = item.cod_director
            clone.querySelector(".codigo_iiee").textContent = item.codigo_iiee
            clone.querySelector(".btn-warning").id = i
            clone.querySelector(".btn-danger").id = i
            
            fragmento.appendChild(clone)
        });

        $bodyTable.appendChild(fragmento)
    }    


    function deleteItem(id) 
    {
       const con = confirm("Esta seguro de esta accioón?")
        if (con) 
        {
            arr_registros.splice( id , 1 )
            console.log(arr_registros);
            showItems(arr_registros)     
        }
    }


    window.addEventListener("click", e => 
    {
        console.log(e.target);
        
        if ( e.target.classList.contains("new-btn") ) 
        {
            trucoB = true
            exampleModal.querySelector("#trickTitle").textContent = "Registrar Tramite"
            exampleModal.querySelector(".btn-primary").textContent = "Guardar"
        }
    
        if ( e.target.classList.contains("btn-danger") ) 
        {
            deleteItem(e.target.id) 
        }


        if ( e.target.classList.contains("btn-warning") ) 
        {
                trucoB = false
        
                indice = e.target.id 
                exampleModal.querySelector("#trickTitle").textContent = "Editar Tramite"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"

                exampleModal.querySelector("#codigo").value = arr_registros[e.target.id].codigo
                exampleModal.querySelector("#descripcion").value = arr_registros[e.target.id].descripcion
                exampleModal.querySelector("#fechaRegistro").value = arr_registros[e.target.id].fechaRegistro
                exampleModal.querySelector("#cod_director").value = arr_registros[e.target.id].cod_director
                exampleModal.querySelector("#nombre_director").value = arr_registros[e.target.id].nombre_director
                exampleModal.querySelector("#apellido_director").value = arr_registros[e.target.id].apellido_director
                exampleModal.querySelector("#dni_director").value = arr_registros[e.target.id].dni_director
                exampleModal.querySelector("#codigo_iiee").value = arr_registros[e.target.id].codigo_iiee
                exampleModal.querySelector("#nombre_iiee").value = arr_registros[e.target.id].nombre_iiee
                exampleModal.querySelector("#direccion_iiee").value = arr_registros[e.target.id].direccion_iiee    
        }


    })


        // FIN DE REGISTRAR TRAMITE










 
    

    });
}(document, window,console);