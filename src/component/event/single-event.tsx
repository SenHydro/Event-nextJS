import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

function SingleEvent({ data }: any) {
  const inputEmail = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>
  const router = useRouter()
  const [message, setMessage] = useState('')
  //   console.log(router)

  const onSubmit = async (e: any) => {
    e.preventDefault()
    let emailValue = inputEmail?.current?.value
    console.log(emailValue)

    const eventID = router?.query.id

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    // check from frontend
    if (!emailValue?.match(validRegex)) {
      setMessage('Please introduce a correct email address')
    }

    try {
      const response = await fetch('/api/email-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue, eventID }),
      })

      if (response.status === 409) {
        const data = await response.json()
        setMessage(data.message)
      }
      if (!response.ok) throw new Error(`Error: ${response.status}`) // check response if 200 it ok otherwise can not

      const dataOK = await response.json()
      console.log(dataOK)
      setMessage(dataOK.message)

      // console.log('POST', data)
      emailValue = ''
      //POST fetch request
      //body, emailValue, eventID
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <div className="event_single_page">
      <h1>{data.title}</h1>
      <Image width={1000} height={500} src={data.image} alt={data.title} />
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className="email_registration">
        <label>Get Registered for this event</label>
        <input ref={inputEmail} id="email" placeholder="Please insert your email" />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default SingleEvent
