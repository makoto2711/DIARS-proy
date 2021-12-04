!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("capa")) || []
     
      
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
               arr_registros[indice].rege =          exampleModal.querySelector("#rege").value
               arr_registros[indice].fecha2 =        exampleModal.querySelector("#fecha2").value
               arr_registros[indice].nombre =        exampleModal.querySelector("#nombre").value
               arr_registros[indice].apellido =      exampleModal.querySelector("#apellido").value
               arr_registros[indice].codigo =        exampleModal.querySelector("#codigo").value 
               arr_registros[indice].des =           exampleModal.querySelector("#des").value 
               arr_registros[indice].ruc =           exampleModal.querySelector("#ruc").value 
               arr_registros[indice].name_ins =      exampleModal.querySelector("#name_ins").value 
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
        localStorage.setItem("capa", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".reg").textContent =       item.rege
            clone.querySelector(".fec").textContent =       item.fecha2
            clone.querySelector(".des").textContent =       item.des
            clone.querySelector(".ruc").textContent =       item.ruc  
              
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
            exampleModal.querySelector("#trickTitle").textContent = "Registrar Solicitud"
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
                exampleModal.querySelector("#trickTitle").textContent = "Editar Solicitud"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                exampleModal.querySelector("#rege").value =              arr_registros[e.target.id].rege
                exampleModal.querySelector("#fecha2").value =            arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#nombre").value =            arr_registros[e.target.id].nombre
                exampleModal.querySelector("#apellido").value =          arr_registros[e.target.id].apellido
                exampleModal.querySelector("#codigo").value =            arr_registros[e.target.id].codigo
                exampleModal.querySelector("#des").value =               arr_registros[e.target.id].des
                exampleModal.querySelector("#ruc").value =               arr_registros[e.target.id].ruc
                exampleModal.querySelector("#name_ins").value =          arr_registros[e.target.id].name_ins
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);