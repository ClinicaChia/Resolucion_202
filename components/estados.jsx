import React from 'react';

const Estados = ({estado}) => {
    return (
        <div>
            <ol>
                <li className={estado>0? "check":""} >Seleccionar la sede correspondiente</li>
                <li className={estado>1? "check":""}>Subir el archivo</li>
                <li className={estado>2? "check":""}>Enviar el archivo</li>
                <li className={estado==3? "loading": estado >2? "check":""}>Esperar el cargue del archivo</li>
                <li li className={estado>4? "check":""}>Descargar archivo</li>
                <li li className={estado>4? "check":""}>Listo</li>
            </ol>
        </div>
    );
}

export default Estados;
