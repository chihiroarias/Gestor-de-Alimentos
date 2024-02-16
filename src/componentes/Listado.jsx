const Listado = () => {

    return (
  
      <div className="Listado-Registros">
        <div className="image"></div>
  
        <div className="busacarxFcha">
          <label htmlFor="btnBuscar">Buscar por fecha</label>
          <input type="date" id="btnBuscar" />
  
          <input type="button" id="buscarFch" value="BUSCAR" />
        </div>
  
      </div>
  
    )
  }
  export default Listado
  
  
  
  
  
  /*
    GET OBTENER REGISTRO
  curl --location -g '{{calcount}}/registros.php?idUsuario=7' \
  --header 'Content-Type: application/json' \
  --header 'apikey: e827ae9286583d79f71670c31c992531' \
  --header 'iduser: 7'
  */
  
  
  
  /*
    DELETE REGISTRO DE COMIDA
  curl --location -g --request DELETE '{{calcount}}/registros.php?idRegistro=3' \
  --header 'Content-Type: application/json' \
  --header 'apikey: f8258457d51b60027c7b6765935caba7' \
  --header 'iduser: 7'
  */