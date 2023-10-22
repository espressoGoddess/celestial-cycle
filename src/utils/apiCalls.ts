import { EntryData } from "@/pages/api/addEntry"

export const postEntry = async (demo: boolean, endpoint: string, entry: EntryData["data"]): Promise<EntryData> => {
  const response = await fetch(`${demo ? '..' : ''}/api/${endpoint}`, {
    method: 'POST', 
    body: JSON.stringify(entry), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`Error: ${response.status} Please try again.`)
  }
  const data = await response.json()
  console.log('data from api', data)
  return data
}

export const getEntry = async (demo: boolean, date: string, userID: string): Promise<{ data: EntryData['data'] }> => {
  const response = await fetch(`${demo ? '..' : ''}/api/entry/${userID}/${date}`) 

  if (!response.ok) {
    throw new Error(`Error: ${response.status} Please try again.`)
  }
  const data = await response.json()
  return data
}