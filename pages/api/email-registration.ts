import path from 'path'
import fs from 'fs'

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json')
}

function ExtractData(filePath: any) {
  const jsonData = fs.readFileSync(filePath)
  console.log(jsonData)
  // const preData = JSON.stringify(jsonData)
  // console.log(preData)
  const data = JSON.parse(jsonData.toString())
  console.log(data)
  return data
}

export default function handler(req: any, res: any) {
  const { method } = req

  // Access our data
  // Extract our data (res 404 if no event)--> All event: loop through themes and identify the eventID --> add email into email_registration
  // only if that email is exist (check email format is OK?)

  const filePath = buildPath()
  console.log(filePath)
  const { events_categories, allEvents } = ExtractData(filePath)

  if (!allEvents) {
    return res.status(404).json({
      message: 'Event data not found',
    })
  }

  if (method === 'POST') {
    const { email, eventID } = req.body

    // check from backend
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' })
    }

    const newAllEvents = allEvents.map((event: any) => {
      if (event.id === eventID) {
        if (event.emails_registered.includes(email)) {
          res.status(409).json({ message: 'This email is already registered' })
          return event
        }
        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        }
      }
      return event
    })

    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }))

    res
      .status(200)
      .json({ message: `You have successfully registration with this email: ${email} for the event ${eventID}` })
  }
}
