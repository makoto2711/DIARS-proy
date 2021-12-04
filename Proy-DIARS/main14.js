!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("cinforme")) || []
     
      
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
               arr_registros[indice].info =          exampleModal.querySelector("#info").value
               arr_registros[indice].fecha2 =        exampleModal.querySelector("#fecha2").value
               arr_registros[indice].nombre =        exampleModal.querySelector("#nombre").value
               arr_registros[indice].apellido =      exampleModal.querySelector("#apellido").value
               arr_registros[indice].codigo =        exampleModal.querySelector("#codigo").value 
               arr_registros[indice].obs =           exampleModal.querySelector("#obs").value 
               arr_registros[indice].estado =        exampleModal.querySelector("#estado1").checked ? exampleModal.querySelector("#estado1").value : exampleModal.querySelector("#estado2").value
             
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
        localStorage.setItem("cinforme", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".info").textContent =      item.info
            clone.querySelector(".fec").textContent =       item.fecha2
            clone.querySelector(".obs").textContent =       item.obs
            clone.querySelector(".cod").textContent =       item.codigo  
            clone.querySelector(".estado").textContent =    item.estado 
              
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
            exampleModal.querySelector("#trickTitle").textContent = "Registrar Información"
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
                exampleModal.querySelector("#trickTitle").textContent = "Editar Información"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                exampleModal.querySelector("#info").value =          arr_registros[e.target.id].info
                exampleModal.querySelector("#fecha2").value =            arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#nombre").value =            arr_registros[e.target.id].nombre
                exampleModal.querySelector("#apellido").value =          arr_registros[e.target.id].apellido
                exampleModal.querySelector("#codigo").value =            arr_registros[e.target.id].codigo
                exampleModal.querySelector("#obs").value =               arr_registros[e.target.id].obs 

                const val1 =  document.getElementsByName("estado")
                val1.forEach(item => 
                    {
                        if (item.value == arr_registros[e.target.id].estado)   item.checked = true    
                    });  

        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);