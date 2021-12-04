!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("proce")) || []
     
      
        // INICIO DE REGISTRAR TRAMITE

        const $temp_table = d.getElementById("temp_table2").content
        const $temp_table2 = d.getElementById("temp_table3").content
        const $formInicio = d.getElementById("formInicio")
        const $bodyTable = d.getElementById("bodyTable")
        const $bodyTable2 = d.getElementById("bodyTable2")
        const fragmento = d.createDocumentFragment()
        const fragmento2 = d.createDocumentFragment()
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
               arr_registros[indice].gb =                exampleModal.querySelector("#gb1").checked ? exampleModal.querySelector("#gb1").value : exampleModal.querySelector("#gb2").value
               arr_registros[indice].codigo2 =        exampleModal.querySelector("#codigo2").value
               arr_registros[indice].numero =         exampleModal.querySelector("#numero").value
               arr_registros[indice].fecha2 =         exampleModal.querySelector("#fecha2").value
               arr_registros[indice].asunto =         exampleModal.querySelector("#asunto").value
               arr_registros[indice].cod_info =    exampleModal.querySelector("#cod_info").value
               arr_registros[indice].descripcion =        exampleModal.querySelector("#descripcion").value
            }
            
            $formInicio.reset()
            showItems(arr_registros) 
        });



    function cleanTable(bodyTable) 
    {
        while (bodyTable.firstChild)  bodyTable.removeChild(bodyTable.firstChild)    
    }


    function showItems(arr) 
    {
        todoStrings = JSON.stringify(arr)
        localStorage.setItem("proce", todoStrings)
        cleanTable($bodyTable) 
        cleanTable($bodyTable2) 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            const clone2 = $temp_table2.cloneNode(true)
            if (item.gb == "SI") 
            {
                clone.querySelector(".cod").textContent =       item.codigo2
                clone.querySelector(".num").textContent =       item.numero
                clone.querySelector(".fec").textContent =       item.fecha2
                clone.querySelector(".asunto").textContent =    item.asunto
                clone.querySelector(".des").textContent =       item.descripcion
                clone.querySelector(".cod_info").textContent =   item.cod_info
                clone.querySelector(".btn-warning").id = i
                clone.querySelector(".btn-danger").id = i
                
                fragmento.appendChild(clone)
            }
            else
            {   
                clone2.querySelector(".cod3").textContent = item.codigo2
                clone2.querySelector(".fec3").textContent = item.fecha2
                clone2.querySelector(".des3").textContent = item.descripcion
                clone2.querySelector(".cod_info3").textContent = item.cod_info
                clone2.querySelector(".btn-warning").id = i
                clone2.querySelector(".btn-danger").id = i
                fragmento2.appendChild(clone2)
            }

        });

        $bodyTable.appendChild(fragmento)
        $bodyTable2.appendChild(fragmento2)
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
            exampleModal.querySelector("#trickTitle").textContent = "Registrar Procedencia"
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
                exampleModal.querySelector("#trickTitle").textContent = "Editar Procedencia"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                const val1 =  d.getElementsByName("gb")
                    val1.forEach(item => 
                        {
                            if (item.value == arr_registros[e.target.id].gb)   item.checked = true    
                        });  

                exampleModal.querySelector("#codigo2").value =              arr_registros[e.target.id].codigo2
                exampleModal.querySelector("#numero").value =               arr_registros[e.target.id].numero
                exampleModal.querySelector("#fecha2").value =               arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#asunto").value =               arr_registros[e.target.id].asunto
                exampleModal.querySelector("#cod_info").value =             arr_registros[e.target.id].cod_info
                exampleModal.querySelector("#descripcion").value =          arr_registros[e.target.id].descripcion
                  
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);