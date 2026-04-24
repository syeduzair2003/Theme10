import { apiTemplate } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import P1 from "@theme1/Pages/Home";
import P2 from "@theme2/Pages/Home";
import P3 from "@theme3/Pages/Home";
import P4 from "@theme4/Pages/Home";
import P5 from "@theme5/Pages/Home";
import P6 from "@theme6/Pages/Home";
import P8 from "@theme8/Pages/Home";
import P9 from "@theme9/Pages/Home";

export const dynamic = "force-dynamic";

export default async function Home() {
  const companyDomain = await cookieService.get("domain");
  const template = (await apiTemplate(companyDomain.domain)).data;
  const selector = (theme: string): any => {
    switch (theme?.trim()?.toLowerCase()) {
      case "theme 1":
        return P1;
      case "theme 2":
        return P2;
      case "theme 3":
        return P3;
      case "theme 4":
        return P4;
      case "theme 5":
        return P5;
      case "theme 6":
        return P6;
      case "theme 8":
        return P8;
      case "theme 9":
        return P9;
      default:
        return P3;
    }
  };

  const SelectedPage = selector("theme 9");
  // const SelectedPage = selector(template?.name);
  return (
    <>
      <SelectedPage />
    </>
  );
}
