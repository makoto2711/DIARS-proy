!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registros = JSON.parse(localStorage.getItem("resol")) || []
     
      
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
               arr_registros[indice].cod_informe =          exampleModal.querySelector("#cod_informe").value
               arr_registros[indice].aulas =                exampleModal.querySelector("#aulas1").checked ? exampleModal.querySelector("#aulas1").value : exampleModal.querySelector("#aulas2").value
               arr_registros[indice].tecn =                 exampleModal.querySelector("#tec1").checked ? exampleModal.querySelector("#tec1").value : exampleModal.querySelector("#tec2").value
               arr_registros[indice].autor =                exampleModal.querySelector("#auto1").checked ? exampleModal.querySelector("#auto1").value : exampleModal.querySelector("#auto2").value
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
        localStorage.setItem("resol", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".cod").textContent =       item.codigo2
            clone.querySelector(".des").textContent =       item.descripcion2
            clone.querySelector(".fec").textContent =       item.fecha2
            clone.querySelector(".cod_info").textContent =  item.cod_informe
            clone.querySelector(".medidas").textContent =   item.aulas
            clone.querySelector(".tecno").textContent =     item.tecn
            clone.querySelector(".cumple").textContent =    item.autor
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
                exampleModal.querySelector("#cod_informe").value =          arr_registros[e.target.id].cod_informe
               
                const val1 =  document.getElementsByName("aulas")
                    val1.forEach(item => 
                        {
                            if (item.value == arr_registros[e.target.id].aulas)   item.checked = true    
                        });  

                const val2 =  document.getElementsByName("tecn")
                        val2.forEach(item => 
                            {
                                if (item.value == arr_registros[e.target.id].tecn)   item.checked = true    
                            }); 
                            
                const val3 =  document.getElementsByName("autor")
                            val3.forEach(item => 
                                {
                                    if (item.value == arr_registros[e.target.id].autor)   item.checked = true    
                                });              
       
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);