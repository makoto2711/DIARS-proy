!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("resolu")) || []
     
      
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
               arr_registros[indice].regi =          exampleModal.querySelector("#regi").value
               arr_registros[indice].fecha2 =        exampleModal.querySelector("#fecha2").value
               arr_registros[indice].nombre =        exampleModal.querySelector("#nombre").value
               arr_registros[indice].apellido =      exampleModal.querySelector("#apellido").value
               arr_registros[indice].codigo =        exampleModal.querySelector("#codigo").value 
               arr_registros[indice].des =           exampleModal.querySelector("#des").value 
               arr_registros[indice].cod_dire =      exampleModal.querySelector("#cod_dire").value 
               arr_registros[indice].full_name =     exampleModal.querySelector("#full_name").value 
              
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
        localStorage.setItem("resolu", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".info").textContent =      item.regi
            clone.querySelector(".fec").textContent =       item.fecha2
            clone.querySelector(".des").textContent =       item.des
            clone.querySelector(".cod_user").textContent =  item.codigo  
            clone.querySelector(".cod_dire").textContent =  item.cod_dire 
              
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
 
                exampleModal.querySelector("#regi").value =              arr_registros[e.target.id].regi
                exampleModal.querySelector("#fecha2").value =            arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#nombre").value =            arr_registros[e.target.id].nombre
                exampleModal.querySelector("#apellido").value =          arr_registros[e.target.id].apellido
                exampleModal.querySelector("#codigo").value =            arr_registros[e.target.id].codigo
                exampleModal.querySelector("#des").value =               arr_registros[e.target.id].des 
                exampleModal.querySelector("#cod_dire").value =          arr_registros[e.target.id].cod_dire 
                exampleModal.querySelector("#full_name").value =         arr_registros[e.target.id].full_name 
 
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);