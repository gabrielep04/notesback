const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

class DataBase {
    constructor(callback) {
        this.callback = callback || (() => {});
        this.Pool = Pool;
        this.query = {};
        this.connection = {};
        this.init();
    }

    async init() {
        try {
            await this.loadQueries();
            await this.loadConnection();
            this.callback();
        } catch (error) {
            console.error("Error inicializando la base de datos:", error);
        }
    }

    async executeQuery(schema, queryId, params) {
        let connection;
        try {
            connection = await this.connectionPool.connect();
            let query = this.getQuery(schema, queryId);
            let response = await connection.query(query, params);
            return response;
        } catch (e) {
            console.error("Error ejecutando la consulta:", e.stack || e);
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    async loadQueries() {
        try {
            const data = await fs.readFile(path.join(__dirname, "configs/queries.json"), 'utf8');
            this.query = JSON.parse(data);
        } catch (err) {
            console.error("Error cargando queries:", err);
            this.query = {};
        }
    }

    async loadConnection() {
    try {
        console.log(process.env.DATABASE_URL);
        
        // Inicializa el pool según entorno
        if (process.env.DATABASE_URL) {
        this.connectionPool = new this.Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        } else {
        const data = await fs.readFile(
            path.join(__dirname, "configs/connections.json"),
            "utf8"
        );
        const conf = JSON.parse(data).config[0];
        this.connectionPool = new this.Pool(conf);
        }

        // ----- TEST DE CONEXIÓN -----
        // Intenta sacar un cliente y hacer un simple SELECT
        const client = await this.connectionPool.connect();
        await client.query('SELECT NOW()');                // o 'SELECT 1'
        client.release();
        console.log('✅ Conexión a la base de datos OK:', new Date());
        // ----------------------------

    } catch (err) {
        console.error("❌ Error cargando/conectando a la base de datos:", err);
        throw err;  // opcional: propagar para que init lo capture
    }
    }


    getQuery(schema, queryId) {
        if (!this.query || !this.query[schema] || !this.query[schema][queryId]) {
            throw new Error(`Consulta no encontrada: ${schema}.${queryId}`);
        }
        return this.query[schema][queryId];
    }
}

module.exports = DataBase;
