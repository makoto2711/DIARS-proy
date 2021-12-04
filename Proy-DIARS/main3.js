!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("tec")) || []
     
      
        // INICIO DE REGISTRAR TRAMITE

        const $temp_table = d.getElementById("temp_table2").content
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
               arr_registros[indice].codigo2 =              exampleModal.querySelector("#codigo2").value
               arr_registros[indice].descripcion2 =         exampleModal.querySelector("#descripcion2").value
               arr_registros[indice].fecha2 =               exampleModal.querySelector("#fecha2").value
               arr_registros[indice].cod_director =         exampleModal.querySelector("#cod_director").value
               arr_registros[indice].nombre_director =      exampleModal.querySelector("#nombre_director").value
               arr_registros[indice].apellido_director =    exampleModal.querySelector("#apellido_director").value
               arr_registros[indice].dni_director =         exampleModal.querySelector("#dni_director").value
               arr_registros[indice].cod_iiee =             exampleModal.querySelector("#cod_iiee").value
               arr_registros[indice].nom_iiee =             exampleModal.querySelector("#nom_iiee").value
               arr_registros[indice].dir_iiee =             exampleModal.querySelector("#dir_iiee").value
               arr_registros[indice].gm =                   exampleModal.querySelector("#gm1").checked ? exampleModal.querySelector("#gm1").value : exampleModal.querySelector("#gm2").value
               arr_registros[indice].seguridad =            exampleModal.querySelector("#seguridad1").checked ? exampleModal.querySelector("#seguridad1").value : exampleModal.querySelector("#seguridad2").value
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
        localStorage.setItem("tec", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".cod").textContent = item.codigo2
            clone.querySelector(".des").textContent = item.descripcion2
            clone.querySelector(".fec").textContent = item.fecha2
            clone.querySelector(".cod_dire").textContent = item.cod_director
            clone.querySelector(".cod_iiee").textContent = item.cod_iiee
            clone.querySelector(".aulas").textContent = item.gm
            clone.querySelector(".sec").textContent = item.seguridad
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
            exampleModal.querySelector("#trickTitle").textContent = "Registrar"
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
                exampleModal.querySelector("#trickTitle").textContent = "Editar"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                exampleModal.querySelector("#codigo2").value =              arr_registros[e.target.id].codigo2
                exampleModal.querySelector("#descripcion2").value =         arr_registros[e.target.id].descripcion2
                exampleModal.querySelector("#fecha2").value =               arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#cod_director").value =         arr_registros[e.target.id].cod_director
                exampleModal.querySelector("#nombre_director").value =      arr_registros[e.target.id].nombre_director
                exampleModal.querySelector("#apellido_director").value =    arr_registros[e.target.id].apellido_director
                exampleModal.querySelector("#dni_director").value =         arr_registros[e.target.id].dni_director
                exampleModal.querySelector("#cod_iiee").value =             arr_registros[e.target.id].cod_iiee
                exampleModal.querySelector("#nom_iiee").value =             arr_registros[e.target.id].nom_iiee
                exampleModal.querySelector("#dir_iiee").value =             arr_registros[e.target.id].dir_iiee
 
                const val1 =  document.getElementsByName("gm")
                    val1.forEach(item => 
                        {
                            if (item.value == arr_registros[e.target.id].gm)   item.checked = true    
                        });  

                const val2 =  document.getElementsByName("seguridad")
                        val2.forEach(item => 
                            {
                                if (item.value == arr_registros[e.target.id].seguridad)   item.checked = true    
                            });  
       
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);