import { ContactForm } from '@/components/contact/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-white/60 text-lg">
            Questions about a package? Planning a big event? We&apos;re happy to help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                We&apos;d love to hear from you
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Whether you&apos;re looking to plan a birthday, corporate event, bachelor party, or
                just a great day on the lake — reach out and we&apos;ll make it happen.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email Us',
                  value: 'tx4evercharters@gmail.com',
                  href: 'mailto:tx4evercharters@gmail.com',
                },
                {
                  icon: Phone,
                  label: 'Call Us',
                  value: '(512) 555-0100',
                  href: 'tel:+15125550100',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Lake Travis, Austin, TX',
                  href: null,
                },
                {
                  icon: Clock,
                  label: 'Hours',
                  value: 'Daily: 8am – 8pm',
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-navy-900/5 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-medium">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-navy-900 hover:text-gold-600 transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-navy-900 font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-serif font-bold text-navy-900 mb-6">Send us a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
