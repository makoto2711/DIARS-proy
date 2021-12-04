!function() 
{

    



    window.addEventListener("DOMContentLoaded", ()=> 
    {
        
        const $menu = document.getElementById("menu")
        const menu_list = ["inicio","generar",
                            "tecnico","resolucion",
                            "solicitud","proveido",
                            "informe","procedencia",
                            "generar_resolucion","memorando",
                            "viaticos","pago","capacitacion",
                            "capa_informe","reg_resolucion"] 

        let ejm =  ""

        function PrimeraLetra(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

        menu_list.forEach(item => 
            {
              ejm += `  <li class="nav-item">
                         <a class="nav-link" href="${item}.html">${PrimeraLetra(item)}</a>
                        </li> `
            });

           $menu.innerHTML = ejm 
    });    
}();