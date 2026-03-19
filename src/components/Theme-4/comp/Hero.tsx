import cookieService from "@/services/CookiesService";
import Slider from "./Slider";
import { apiGetTrippleBannersCarousel } from "@/apis/page_optimization";

const Hero = async () => {
  const companyDomain = await cookieService.get("domain");

  const data = (await apiGetTrippleBannersCarousel(companyDomain?.domain))?.data;
  const flatData = data?.flat();

  const grouped = [];
for (let i = 0; i < flatData?.length; i += 3) {
  grouped.push(flatData?.slice(i, i + 3));
}

const reordered = grouped.map(group =>
  group?.length === 3 ? [group[1], group[0], group[2]] : group
);


  return (
    <section className="relative md:my-4">
      <Slider slides={reordered} />
    </section>
  );
};

export default Hero;
