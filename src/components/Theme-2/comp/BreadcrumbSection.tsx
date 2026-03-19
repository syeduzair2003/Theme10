import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    imageSrc?: string;
    imageAlt?: string;
}

export default function BreadcrumbSection({
    title,
    breadcrumbs,
    imageSrc = "/themes/Theme_3/img/website.png",
    imageAlt = "Breadcrumb Banner",
}: Props) {
    return (
        <>
            <div className="breadcrumb-section">
                <div className="breadcrumb-text">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6 col-sm-12">
                                <div className="breadcrumb-text padTB50">
                                    <h1 className='page-heading'>{title}</h1>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12 d-flex justify-content-center justify-content-md-end">
                                <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                        width: "300px",
                                        height: "250px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={imageSrc}
                                        alt={imageAlt}
                                        width={350}
                                        height={250}
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-12 pb-3">
                                <ul className="breadcrumb-list d-flex p-0">
                                    {breadcrumbs.map((crumb, idx) => (
                                        <li key={idx} className="text-capitalize d-flex align-items-center">
                                            {crumb.href ? (
                                                <Link href={crumb.href} className="text-capitalize">
                                                    {crumb.label}
                                                </Link>
                                            ) : (
                                                <span className="text-capitalize">{crumb.label}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
