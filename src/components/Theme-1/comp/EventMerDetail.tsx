import { discardHTMLTags } from "@/constants/hooks";
import Link from "next/link";

// Strip HTML tags
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

type Props = {
  description: string;
  merchantDetails: string;
  slug: string[] ;
};

export default function EventMerDetail({ description, merchantDetails, slug }: Props) {
  const plainText = stripHtml(description);
  const showMore = merchantDetails === "1";

  const maxLength = 200;
  const isLong = plainText.length > maxLength;

  const displayText = showMore ? plainText : truncate(plainText, maxLength);

 
  const basePath = `/events/${slug.join("/")}`;
  const toggleHref = {
    pathname: basePath,
    query: { merchantDetails: showMore ? "0" : "1" },
  };

  return (
   
        <div className="card modern-sidebar p-4 rounded-4 shadow-sm bg-white mb-3 g-2 my-2 ">
          <div className="card-body">
            <p>{discardHTMLTags(displayText)}</p>

            {isLong && (
              <Link href={toggleHref} className="show-event-btn event-button-link p-0 mt-2">
                {showMore ? "Show less" : "Show more"}
              </Link>
            )}
          </div>
        </div>
  );
}
