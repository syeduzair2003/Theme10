import { apiContactForm, apiContactPage } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import { label } from "framer-motion/client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShareAlt, FaPinterest, FaYoutube, FaTiktok } from "react-icons/fa";
import { SiFlipboard, SiThreads } from "react-icons/si";
import PageBanner from "../../comp/PageBanner";

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = (await (apiContactPage(companyDomain?.domain)))?.data

    async function submitContactForm(formData: FormData) {
        "use server";
        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const number = formData.get("number") as string;
        const message = formData.get("message") as string;
        try {
            const test = apiContactForm(companyDomain.domain, name, number, email, message)
        }
        catch (err) {
        }
    }

    return (
        <>
            <PageBanner
                title="Contact Us"
                image="/themes/Theme_3/images/banner-illus-15.png"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us", href: `` },
                ]} />
            <section className="py-16 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-2 md:px-6">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have a question or need help? We would love to hear from you. Fill out the form or reach us directly using the details below.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                            <form action={submitContactForm} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="number"
                                        placeholder="Enter your phone number"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Write your message..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg bg-[var(--primary-color)] text-white font-semibold shadow-md hover:opacity-90 transition-all"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 flex flex-col">
                            <div className="space-y-8">
                                {/* Location */}
                                {response?.CompanyContactUs?.address && (
                                    <div className="flex items-start gap-4">
                                        <FaMapMarkerAlt className="text-[var(--primary-color)] text-xl mt-1" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Our Location</h3>
                                            <p className="text-gray-600 pt-1">{response.CompanyContactUs.address}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                {response?.CompanyContactUs?.email && (
                                    <div className="flex items-start gap-4">
                                        <FaEnvelope className="text-[var(--primary-color)] text-xl mt-1" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                                            <p className="text-gray-600 pt-1">{response.CompanyContactUs.email}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Phone */}
                                {response?.CompanyContactUs?.phone_no && (
                                    <div className="flex items-start gap-4">
                                        <FaPhoneAlt className="text-[var(--primary-color)] text-xl mt-1" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                                            <p className="text-gray-600 pt-1">{response.CompanyContactUs.phone_no}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Social Links */}
                                {(
                                    response?.company_data?.facebook ||
                                    response?.company_data?.twitter ||
                                    response?.company_data?.instagram ||
                                    response?.company_data?.linkedin ||
                                    response?.company_data?.pinterest ||
                                    response?.company_data?.youtube ||
                                    response?.company_data?.flipboard ||
                                    response?.company_data?.tiktok ||
                                    response?.company_data?.threads
                                ) && (
                                        <div className="flex items-start gap-4">
                                            <FaShareAlt className="text-[var(--primary-color)] text-xl mt-1" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                                                <div className="flex flex-wrap gap-5 text-gray-700 text-2xl ">
                                                    {response.company_data.facebook && (
                                                        <Link href={response.company_data.facebook} className="text-[#1877F2] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><FaFacebook /></Link>
                                                    )}
                                                    {response.company_data.twitter && (
                                                        <Link href={response.company_data.twitter} className="hover:text-sky-500"><FaTwitter /></Link>
                                                    )}
                                                    {response.company_data.instagram && (
                                                        <Link href={response.company_data.instagram} className="text-white rounded transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]   bg-[linear-gradient(45deg,rgba(255,200,55,1),rgba(255,48,108,1),rgba(131,58,180,1))]"><FaInstagram /></Link>
                                                    )}
                                                    {response.company_data.linkedin && (
                                                        <Link href={response.company_data.linkedin} className="text-[#0077B5] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><FaLinkedin /></Link>
                                                    )}
                                                    {response.company_data.pinterest && (
                                                        <Link href={response.company_data.pinterest} className="text-[#E60023] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><FaPinterest /></Link>
                                                    )}
                                                    {response.company_data.youtube && (
                                                        <Link href={response.company_data.youtube} className="text-[#FF0000] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><FaYoutube /></Link>
                                                    )}
                                                    {response.company_data.flipboard && (
                                                        <Link href={response.company_data.flipboard} className="transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><SiFlipboard /></Link>
                                                    )}
                                                    {response.company_data.tiktok && (
                                                        <Link href={response.company_data.tiktok} className="transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><FaTiktok /></Link>
                                                    )}
                                                    {response.company_data.threads && (
                                                        <Link href={response.company_data.threads} className="text-black transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] "><SiThreads /></Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default page;