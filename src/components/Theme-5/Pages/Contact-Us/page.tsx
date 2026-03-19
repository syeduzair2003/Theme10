import React from 'react'
import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import cookieService from '@/services/CookiesService'
import { apiContactPage } from '@/apis/user'
import { faEnvelopeOpen, faMapPin, faPhone, FontAwesomeIcon } from '@/constants/icons'

const ContactUs = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const fullPageData = (await apiContactPage(companyDomain))?.data;
  const pageData = fullPageData?.CompanyContactUs;

  return (
    <>
      <Header
        title="Contact Us"
        subtitle=""
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' }
        ]}
      />

      <section className="py-20 bg-[#FBFDFF] min-h-screen -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.03)] border border-slate-50 p-10 md:p-14">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-xl transition-all duration-300 font-bold text-sm uppercase tracking-widest">
                  Send Message
                </button>
              </form>
            </div>

            <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.03)] border border-slate-50 p-10 md:p-14">
              <h2 className="text-3xl font-black text-slate-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-50 p-3 rounded-xl">
                    <FontAwesomeIcon icon={faEnvelopeOpen} className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Email</h3>
                    <p className="text-gray-600">{pageData?.email || 'contact@example.com'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Phone</h3>
                    <p className="text-gray-600">{pageData?.phone_no || '+1 (555) 123-4567'}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <FontAwesomeIcon icon={faMapPin} className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Address</h3>
                    <p className="text-gray-600">{pageData?.address || '123 Business Street, Suite 100, City, State 12345'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default ContactUs
