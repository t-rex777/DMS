import React from 'react'
import AppLayout from '../AppLayout'

const ContactUs = () => {
  return (
    <AppLayout>
      <div className='flex flex-col gap-4'>
        <div>
          We value your feedback, inquiries, and suggestions. If you have any questions or need
          assistance regarding our College Department Management System, please don't hesitate to
          reach out to us. Our dedicated team is here to assist you.
        </div>
        <div>You can contact us through the following methods:</div>
        <div>1. Phone: +9874563210</div>
        <div>2. Email: dms@college.org</div>
        <div>
          We strive to respond to all inquiries within [timeframe]. However, response times may vary
          depending on the volume of inquiries received. We appreciate your patience and assure you
          that we will make every effort to address your query as quickly as possible.
        </div>
        <div>
          Thank you for your interest in our College Department Management System. We look forward
          to assisting you and providing the support you need. Your satisfaction is our priority,
          and we are committed to delivering exceptional service to ensure the smooth operation of
          your college department.
        </div>
      </div>
    </AppLayout>
  )
}

export default ContactUs
