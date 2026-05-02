import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('asistente_personal.db');

export const database = {
  execute: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(sql, params, (_, result) => {
          // For SELECT queries, result.rows is accessible
          if (sql.trim().toUpperCase().startsWith('SELECT')) {
            let rows = [];
            for (let i = 0; i < result.rows.length; i++) {
              rows.push(result.rows.item(i));
            }
            resolve({ rows });
          } else {
            resolve(result);
          }
        }, (_, error) => {
          reject(error);
        });
      });
    });
  },

  initDatabase: async () => {
    try {
      // Create all tables
      await database.execute(`
        CREATE TABLE IF NOT EXISTS doctores (
          id_doctor INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL UNIQUE,
          especialidad TEXT,
          telefono TEXT,
          email TEXT,
          direccion TEXT,
          notas TEXT,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
          fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS codigos_puertas (
          id_codigo INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre_puerta TEXT NOT NULL UNIQUE,
          codigo TEXT NOT NULL,
          ubicacion TEXT,
          tipo TEXT DEFAULT 'numerica',
          fecha_cambio DATETIME DEFAULT CURRENT_TIMESTAMP,
          notas TEXT,
          activo BOOLEAN DEFAULT 1
        )
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS numeros_ip (
          id_ip INTEGER PRIMARY KEY AUTOINCREMENT,
          dispositivo_nombre TEXT NOT NULL UNIQUE,
          direccion_ip TEXT NOT NULL UNIQUE,
          tipo_dispositivo TEXT,
          descripcion TEXT,
          puerto TEXT,
          usuario TEXT,
          contraseña TEXT,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
          activo BOOLEAN DEFAULT 1
        )
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS contactos (
          id_contacto INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL UNIQUE,
          telefono TEXT,
          email TEXT,
          categoria TEXT,
          notas TEXT,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS datos_personalizados (
          id_dato INTEGER PRIMARY KEY AUTOINCREMENT,
          categoria TEXT NOT NULL,
          clave TEXT NOT NULL,
          valor TEXT NOT NULL,
          tipo TEXT DEFAULT 'texto',
          UNIQUE(categoria, clave)
        )
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS historial_consultas (
          id_historial INTEGER PRIMARY KEY AUTOINCREMENT,
          tipo_consulta TEXT,
          consulta_texto TEXT,
          respuesta_texto TEXT,
          fecha_consulta DATETIME DEFAULT CURRENT_TIMESTAMP,
          duracion_segundos INTEGER
        )
      `);

      await database.execute(`
        CREATE TABLE IF NOT EXISTS configuracion (
          id_config INTEGER PRIMARY KEY AUTOINCREMENT,
          clave TEXT NOT NULL UNIQUE,
          valor TEXT,
          tipo TEXT DEFAULT 'texto'
        )
      `);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
};

export default database;