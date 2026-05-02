  import React, { useEffect } from 'react';
  import RootNavigator from './navigation/RootNavigator';
  import { database } from './database';

  export default function App() {
    useEffect(() => {
      database.initDatabase();
    }, []);

    return <RootNavigator />;
  }

  ---
  2️⃣Crear el archivo app.json (¡CRÍTICO!)

  En la misma carpeta del proyecto, crea un archivo llamado app.json con este contenido:

  {
    "expo": {
      "name": "AsistentePersonal",
      "slug": "asistente-personal",
      "version": "1.0.0",
      "sdkVersion": "55.0.0",
      "platforms": ["android"],
      "android": {
        "package": "com.asistente.personal",
        "versionCode": 1
      }
    }
  }