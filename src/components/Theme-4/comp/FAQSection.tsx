import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa6";
import { apiHomePageFaqs, apiRecentlyUpdatedStores } from "@/apis/user";

interface FAQSectionProps {
  companyDomain: string;
}

const FAQSection = async ({ companyDomain }: FAQSectionProps) => {
  // Fetch data server-side
  const [faqRes, updatedStoresRes] = await Promise.all([
    apiHomePageFaqs(companyDomain),
    apiRecentlyUpdatedStores(companyDomain),
  ]);
  const faqs = faqRes?.data || [];
  const updatedStores = updatedStoresRes?.data || [];

  // if (!faqs.length && !updatedStores?.length) return null;

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] text-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          {faqs.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Frequently Asked Questions (FAQ)
              </h3>
              <div className="space-y-4">
                {faqs.map((faq: any, idx: number) => (
                  <details
                    key={idx}
                    className="group border border-gray-200 rounded-xl bg-white shadow-sm"
                  >
                    <summary className="flex justify-between items-center cursor-pointer px-6 py-4 text-gray-800 font-medium list-none">
                      {faq?.question}
                      <FaChevronDown
                        className="ml-2 transition-transform duration-300 group-open:rotate-180 text-gray-500"
                        size={16}
                      />
                    </summary>
                    <div className="px-6 py-4 text-gray-600 border-t border-gray-100">
                      {faq?.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Recently Updated Stores Section */}
          {updatedStores.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Recently Updated Stores
              </h3>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {updatedStores?.map((store: any) => (
                  <Link
                    key={store?.id}
                    href={`/store/${store?.slug}`}
                    className="group no-underline flex flex-col items-center rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                  >
                    {/* IMAGE WRAPPER */}
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-50 flex border border-[#ea2217] items-center justify-center overflow-hidden">
                      <Image
                        src={`/${store?.merchant_logo}`}
                        alt={store?.merchant_name}
                        fill
                        className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* NAME */}
                    {/* <p className="text-sm md:text-base font-medium text-gray-800 group-hover:text-[var(--primary-color)] text-center">
                      {store?.merchant_name}
                    </p> */}
                  </Link>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
