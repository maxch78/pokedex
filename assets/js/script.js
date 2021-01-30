$(document).ready(function () {
    
    $('.nosotros').click(function(){
        
        alert(`Con la Pokédex podrás encontrar a tu Pokémon favorito o todos los que quieras. Aquí podrás aprender a identificarlos por su nombre, conociendo su tipología, debilidades, habilidades y muchos otros datos que cada Pokémon tiene por descubrir. ¡Vamos qué esperas para usar tu Pokédex!`);
    });
    $('.btn').click(function(){
        let regist = $('input').val();
        console.log('input')
        alert('Ya estás suscrito. Ahora a disfrutar de tus beneficios')
    });
    
    $('#buscando').on('click',()=>{
        let entrada = $('input').val();
        console.log($('input'));

        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${entrada}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                console.log(response.abilities);
                console.log(response.types);
                var tipo = response.types;
                var habilidad =response.abilities;
                let infoPoke = response;
                $('#mostrarPoke').html(`
                <img class="imagen" src="${infoPoke.sprites.front_default}" alt="${infoPoke.id}">
                <p>Nombre:  ${infoPoke.name}</p>
                <p>Habilidad:  ${habilidad[1].ability.name}</p>
                <p>Tipo=  ${tipo[0].type.name}</p>
                
                `);
                $('#movimientos > ul').html("");
                infoPoke.moves.forEach((movimiento,index) => {
                    $('#movimientos > ul').append(`
                        <li>${index+1} - ${movimiento.move.name}</li>
                    `);
                });
                $('input').val("");

                /*grafico */ 
                var options = {
                    title: {
                        text: "CARACTERÍSTICAS"              
                    },
                    data: [              
                        {
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            dataPoints: [
                                { label: "Hp",  y: infoPoke.stats[0].base_stat },
                                { label: "Defense",  y: infoPoke.stats[1].base_stat },
                                { label: "Special-Attack",  y: infoPoke.stats[2].base_stat },
                                { label: "Especial-Defense", y: infoPoke.stats[3].base_stat },
                                { label: "Speed",  y: infoPoke.stats[4].base_stat },
                            ]
                        }
                    ]
                };
                
                $("#chartContainer").CanvasJSChart(options);
            },
            error: function (error) {
                console.error(error);
                $('#mostraerPoke').append(`
                <p>El Nombre o Número: ${entrada} buscado no existe, intenta nuevamente</p>
                <p>El estado de la busqueda es ${error.status}</p>
                `)
            }
        });
    });
});