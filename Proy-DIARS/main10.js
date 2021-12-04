!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("memo")) || []
     
      
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
               arr_registros[indice].codigo2 =          exampleModal.querySelector("#codigo2").value
               arr_registros[indice].fecha2 =           exampleModal.querySelector("#fecha2").value
               arr_registros[indice].para =             exampleModal.querySelector("#para").value
               arr_registros[indice].de =               exampleModal.querySelector("#de").value
               arr_registros[indice].asunto =           exampleModal.querySelector("#asunto").value 
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
        localStorage.setItem("memo", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".cod").textContent =       item.codigo2
            clone.querySelector(".fec").textContent =       item.fecha2
            clone.querySelector(".para").textContent =      item.para
            clone.querySelector(".de").textContent =        item.de
            clone.querySelector(".asunto").textContent =    item.asunto 
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
            exampleModal.querySelector("#trickTitle").textContent = "Registrar Memorando"
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
                exampleModal.querySelector("#trickTitle").textContent = "Editar Memorando"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                exampleModal.querySelector("#codigo2").value =              arr_registros[e.target.id].codigo2
                exampleModal.querySelector("#fecha2").value =               arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#para").value =                 arr_registros[e.target.id].para
                exampleModal.querySelector("#de").value =                   arr_registros[e.target.id].de
                exampleModal.querySelector("#asunto").value =               arr_registros[e.target.id].asunto
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);