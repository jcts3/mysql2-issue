import * as mysql from 'mysql2/promise'

const readPool = mysql.createPool({host: 'localhost', user: 'root', database: 'test' })

export const dummyFunction = async (id: string) => {
  try {
    const [ [ result ] ] = await (await readPool).execute(
      `
        SELECT * FROM table WHERE id = ?
      `,
      [
        id
      ]
    )
    // underlined 'result' Gives:
    // Type 'RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader' must have a '[Symbol.iterator]()' method that returns an iterator.

    const [ result2 ] = await readPool.execute(`SELECT * FROM table WHERE id = ${id}`)

    type ReturnedResult = {
      id: string
    }
    const returnedResult: ReturnedResult = result2.id
    // underlined 'result2.id' Gives:
    // Property 'id' does not exist on type 'RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader'.
    // Property 'id' does not exist on type 'RowDataPacket[]'. ts(2339)
    
    console.log(result2, result,returnedResult)
  } catch (err) {
    console.log(err)
  } 
  
}