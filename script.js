$(document).ready(function(){

    marcas();
    modelos();
    anos();
    exibirvalores();
    novaconsulta();

});
function marcas(){
    $("#tipo").change(function(){
        tipo = $(this).val();
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+tipo+"/marcas",
            success: function(data){
                $("#marca").html("");
                $("#marca").append("<option value=''>Selecione a marca:</option>");
                $.each(data, function(k, v) {
                    // console.log(v);
                    $("#marca").append("<option value="+v['codigo']+">"+v['nome']+"</option>");
                });
            }
        });
    });
};
function modelos(){
    $("#marca").change(function(){
        modelo = $(this).val();
        tipo = $("#tipo").val();
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+tipo+"/marcas/"+modelo+"/modelos",
            success: function(data){
                $("#modelo").html("");
                $("#modelo").append("<option value=''>Selecione o modelo:</option>");
                $.each(data["modelos"], function(k, v) {
                    // console.log(v);
                    $("#modelo").append("<option value="+v['codigo']+">"+v['nome']+"</option>");
                });
            }
        });
    });
}
function anos(){
    $("#modelo").change(function(){
        ano = $(this).val();
        tipo = $("#tipo").val();
        modelo = $("#marca").val();
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+tipo+"/marcas/"+modelo+"/modelos/"+ano+"/anos",
            success: function(data){
                // console.log(modelo);
                // console.log(ano);
                $("#ano").html("");
                $("#ano").append("<option value=''>Selecione o ano:</option>");
                $.each(data, function(k, v) {
                    // console.log(v);
                    $("#ano").append("<option value="+v['codigo']+">"+v['nome']+"</option>");
                });
            }
        });
    });
}
function exibirvalores(){
    $("#ano").change(function(){
        cod_ano = $(this).val();
        tipo = $("#tipo").val();
        modelo = $("#marca").val();
        ano = $("#modelo").val();
        // console.log(cod_ano);
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+tipo+"/marcas/"+modelo+"/modelos/"+ano+"/anos/"+cod_ano+"",
            success: function(data){
                $("#info").html("");
                $.each(data, function(k, v) {
                    // console.log(v);
                    var table = '<table class="table"><br>\
                    <tr>\
                        <th>Mes de referencia:</th>\
                        <td>'+data.MesReferencia+'</td>\
                    </tr>\
                    <tr>\
                        <th>Codigo Fipe:</th>\
                        <td>'+data.CodigoFipe+'</td>\
                    </tr>\
                    <tr>\
                        <th>Marca:</th>\
                        <td>'+data.Marca+'</td>\
                    </tr>\
                    <tr>\
                        <th>Modelo:</th>\
                        <td>'+data.Modelo+'</td>\
                    </tr>\
                    <tr>\
                        <th>Ano Modelo:</th>\
                        <td>'+data.AnoModelo+' '+data.Combustivel+'</td>\
                    </tr>\
                    <tr>\
                        <th>Combustível:</th>\
                        <td>'+data.Combustivel+'</td>\
                    </tr>\
                    <tr>\
                        <th>Valor:</th>\
                        <td>'+data.Valor+'</td>\
                    </tr>\
                    </table>';
                    $('#info').html(table);

                });
            }
        });
    });
}
function novaconsulta(){
    $("#reset").click(function(){
        $("#marca").val("");
        $("#modelo").val("");
        $("#ano").val("");
        $("#info").html("");
    });
}