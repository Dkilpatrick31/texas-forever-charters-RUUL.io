import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  await transporter.sendMail({
    from: `"Texas Forever Charters Website" <${process.env.SMTP_USER}>`,
    to: 'tx4evercharters@gmail.com',
    replyTo: data.email,
    subject: `New Contact: ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #040f30;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
          ${data.phone ? `<tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone}</td></tr>` : ''}
          <tr><td style="padding: 8px; font-weight: bold;">Subject:</td><td style="padding: 8px;">${data.subject}</td></tr>
        </table>
        <h3 style="color: #040f30;">Message:</h3>
        <p style="white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px;">${data.message}</p>
      </div>
    `,
  })
}

export async function sendBookingConfirmation(data: {
  to: string
  customerName: string
  packageName: string
  date: string
  partySize: number
  depositAmount: number
  totalAmount: number
}) {
  await transporter.sendMail({
    from: `"Texas Forever Charters" <${process.env.SMTP_USER}>`,
    to: data.to,
    subject: `Booking Confirmed — ${data.packageName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #040f30;">Your Charter is Confirmed!</h2>
        <p>Hey ${data.customerName}, we can't wait to take you out on the water!</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; font-weight: bold;">Package:</td><td style="padding: 8px;">${data.packageName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Date:</td><td style="padding: 8px;">${data.date}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Party Size:</td><td style="padding: 8px;">${data.partySize}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Deposit Paid:</td><td style="padding: 8px;">$${(data.depositAmount / 100).toFixed(2)}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Remaining Balance:</td><td style="padding: 8px;">$${((data.totalAmount - data.depositAmount) / 100).toFixed(2)}</td></tr>
        </table>
        <p>The remaining balance is due on the day of your charter. Questions? Reply to this email or call us.</p>
        <p style="color: #f59e0b; font-weight: bold;">See you on the water! 🚢</p>
      </div>
    `,
  })
}
