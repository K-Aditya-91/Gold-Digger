import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'

export async function addNewPurchase(newPurchase) {

  try { 

    const purchases = await getData()
    purchases.push(newPurchase)
    
    const pathJSON = path.join('data', 'data.json')
    
    await fs.writeFile(
      pathJSON,
      JSON.stringify(purchases, null, 2),
      'utf8'
    )

  } catch (err) {
    console.log(err);
  }

}
