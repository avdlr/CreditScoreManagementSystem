import sql from 'mssql';

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

/**
 * Fetch credit score information for a person from SQL Server.
 * @param {string} personId
 * @returns {Promise<{score:number,lastUpdated:string,history:{date:string,score:number}[]}>}
 */
export async function fetchCreditData(personId) {
  const pool = await sql.connect(sqlConfig);
  try {
    const result = await pool
      .request()
      .input('personId', sql.VarChar, personId)
      .query(`
        SELECT score, lastUpdated FROM CreditScores WHERE personId = @personId;
        SELECT date, score FROM CreditScoreHistory WHERE personId = @personId ORDER BY date;
      `);

    const scoreRow = result.recordsets[0][0] || {};
    const historyRows = result.recordsets[1] || [];

    return {
      score: scoreRow.score || 0,
      lastUpdated: scoreRow.lastUpdated || new Date().toISOString(),
      history: historyRows.map(r => ({ date: r.date, score: r.score }))
    };
  } finally {
    await pool.close();
  }
}
