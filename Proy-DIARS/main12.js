!function(d,w,c) 
{
    "use strict"
    w.addEventListener("DOMContentLoaded", ()=> 
    {
        const arr_registrados = JSON.parse(localStorage.getItem("via")) || []
        
        console.log(arr_registrados);
        const arr_registros = JSON.parse(localStorage.getItem("pago")) || []
     
      
        // INICIO DE REGISTRAR TRAMITE

        const $temp_table = d.getElementById("temp_table2").content
        const $temp_table2 = d.getElementById("temp_table3").content
       
        const $formInicio = d.getElementById("formInicio")
        const $bodyTable = d.getElementById("bodyTable")
        const $bodyTable2 = d.getElementById("bodyTable2")
        const fragmento = d.createDocumentFragment()
        let cadena = ""
        let jason
        let trucoB = false
        let indice = null
        let todoStrings

        const exampleModal = d.getElementById("exampleModal")
    
     
        if (arr_registrados.length > 0) 
        {
            MainItems(arr_registrados)     
        }

        if (arr_registros.length > 0) 
        {
            showItems(arr_registros)     
        }
        
 

        function MainItems(arr) 
        { 
            arr.forEach( (item,i) => 
            {
                const clone2 = $temp_table2.cloneNode(true)
                clone2.querySelector(".cod").textContent =  item.codigo2
                clone2.querySelector(".des").textContent =  item.des
                clone2.querySelector(".fec").textContent =  item.fecha2
                clone2.querySelector(".dir").textContent =  item.dir
                clone2.querySelector(".dni").textContent =  item.dni 
                clone2.querySelector(".btn-warning").id = i 
                 
                fragmento.appendChild(clone2)
            });
    
            $bodyTable2.appendChild(fragmento)
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
               arr_registros[indice].des =              exampleModal.querySelector("#des").value
               arr_registros[indice].fecha2 =           exampleModal.querySelector("#fecha2").value
               arr_registros[indice].dir =              exampleModal.querySelector("#dir").value
               arr_registros[indice].dni =              exampleModal.querySelector("#dni").value 
               arr_registros[indice].total =            exampleModal.querySelector("#total").value 
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
        localStorage.setItem("pago", todoStrings)
        cleanTable() 

        arr.forEach( (item,i) => 
        {
            const clone = $temp_table.cloneNode(true)
            clone.querySelector(".cod").textContent =       item.codigo2
            clone.querySelector(".des").textContent =       item.des
            clone.querySelector(".fec").textContent =       item.fecha2
            clone.querySelector(".dir").textContent =       item.dir
            clone.querySelector(".dni").textContent =       item.dni 
            clone.querySelector(".pagar").textContent =       item.total 
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

        if ( e.target.classList.contains("balls") ) 
        {
                trucoB = true
        
                indice = e.target.id 
                exampleModal.querySelector("#trickTitle").textContent = "Editar"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                exampleModal.querySelector("#codigo2").value =              arr_registrados[e.target.id].codigo2
                exampleModal.querySelector("#des").value =                  arr_registrados[e.target.id].des
                exampleModal.querySelector("#fecha2").value =               arr_registrados[e.target.id].fecha2
                exampleModal.querySelector("#dir").value =                  arr_registrados[e.target.id].dir
                exampleModal.querySelector("#dni").value =                  arr_registrados[e.target.id].dni 
        }



        if ( e.target.classList.contains("gaturro") ) 
        {
                trucoB = false
                
                indice = e.target.id 
                exampleModal.querySelector("#trickTitle").textContent = "Editar Viaticos"
                exampleModal.querySelector(".btn-primary").textContent = "Actualizar"
 
                exampleModal.querySelector("#codigo2").value =              arr_registros[e.target.id].codigo2
                exampleModal.querySelector("#des").value =                  arr_registros[e.target.id].des
                exampleModal.querySelector("#fecha2").value =               arr_registros[e.target.id].fecha2
                exampleModal.querySelector("#dir").value =                  arr_registros[e.target.id].dir
                exampleModal.querySelector("#dni").value =                  arr_registros[e.target.id].dni 
                exampleModal.querySelector("#total").value =                arr_registros[e.target.id].total 
        }


    })


        // FIN DE REGISTRAR TRAMITE


    });
}(document, window,console);