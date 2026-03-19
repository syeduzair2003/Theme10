import { CategoryData } from '@/services/dataTypes'
import { getBaseImageUrl } from '@/constants/hooks';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
    category: CategoryData;
    domain: string;
}

const CategoryCards = ({ category, domain }: Props) => {
    // const [merchants, setMerchants] = useState<CompanyWiseMerchant[]>([]);
    // const [loading, setLoading] = useState(false);
    // const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    // const [dataFetched, setDataFetched] = useState(false);
    // const [show, setShow] = useState(false);
    // const cardRef = React.useRef<HTMLDivElement>(null);
    // const popoverRef = React.useRef<HTMLDivElement>(null);

    // const fetchMerchants = useCallback(async () => {
    //     if (merchants.length > 0 || loading || dataFetched) return;

    //     setLoading(true);
    //     try {
    //         const response = await apiMerchantDetailsByCategory(category.unique_id, companyId);
    //         setMerchants(response?.data?.merchants || []);
    //         setDataFetched(true);
    //     } catch (error) {
    //         console.error('Error fetching merchants:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [category.unique_id, companyId, merchants.length, loading, dataFetched]);

    // const handleMouseEnter = () => {
    //     // Clear any existing timer
    //     if (timer) clearTimeout(timer);

    //     // If there's an active tooltip and it's not this one, hide it first
    //     if (activeTooltipId && activeTooltipId !== category.unique_id) {
    //         const event = new CustomEvent('hideTooltip', { detail: { id: activeTooltipId } });
    //         window.dispatchEvent(event);
    //     }

    //     // Set this as the active tooltip
    //     activeTooltipId = category.unique_id;
    //     setShow(true);

    //     // Start timer for API call (2 seconds)
    //     const timeoutId = setTimeout(() => {
    //         fetchMerchants();
    //     }, 2000);
    //     setTimer(timeoutId);
    // };

    // const handleMouseLeave = (e: React.MouseEvent) => {
    //     const popoverElement = popoverRef.current;
    //     const cardElement = cardRef.current;
    //     const relatedTarget = e.relatedTarget as HTMLElement | null;

    //     if (!relatedTarget) {
    //         setShow(false);
    //         if (activeTooltipId === category.unique_id) {
    //             activeTooltipId = null;
    //         }
    //         return;
    //     }

    //     // Check if moving to popover
    //     if (popoverElement &&
    //         (popoverElement.contains(relatedTarget) ||
    //          relatedTarget.closest('.merchants-popover'))) {
    //         return;
    //     }

    //     // Check if moving to card
    //     if (cardElement && cardElement.contains(relatedTarget)) {
    //         return;
    //     }

    //     // Hide immediately
    //     setShow(false);
    //     if (activeTooltipId === category.unique_id) {
    //         activeTooltipId = null;
    //     }
    // };

    // useEffect(() => {
    //     const handlePopoverMouseLeave = (e: MouseEvent) => {
    //         const cardElement = cardRef.current;
    //         const relatedTarget = e.relatedTarget as HTMLElement | null;

    //         if (!relatedTarget || !cardElement) {
    //             setShow(false);
    //             if (activeTooltipId === category.unique_id) {
    //                 activeTooltipId = null;
    //             }
    //             return;
    //         }

    //         if (!cardElement.contains(relatedTarget)) {
    //             setShow(false);
    //             if (activeTooltipId === category.unique_id) {
    //                 activeTooltipId = null;
    //             }
    //         }
    //     };

    //     const handleHideTooltip = (e: CustomEvent) => {
    //         if (e.detail.id === category.unique_id) {
    //             setShow(false);
    //         }
    //     };

    //     const popoverElement = popoverRef.current;
    //     if (popoverElement) {
    //         popoverElement.addEventListener('mouseleave', handlePopoverMouseLeave as any);
    //     }

    //     // Listen for hide tooltip events
    //     window.addEventListener('hideTooltip', handleHideTooltip as any);

    //     return () => {
    //         if (popoverElement) {
    //             popoverElement.removeEventListener('mouseleave', handlePopoverMouseLeave as any);
    //         }
    //         window.removeEventListener('hideTooltip', handleHideTooltip as any);
    //         if (timer) {
    //             clearTimeout(timer);
    //         }
    //         // Clear active tooltip if this component is unmounting and it's the active one
    //         if (activeTooltipId === category.unique_id) {
    //             activeTooltipId = null;
    //         }
    //     };
    // }, [category.unique_id, timer]);

    return (
        <div className="position-relative h-100">
            {/* <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='h-100'> */}
            {/* <div className='h-100'> */}
            <Link href={`/${category?.url}`} className='single-box transition d-grid gap-3 gap-md-4 text-center n1-bg-color cus-border border b-seventh px-2 px-xxl-3 py-4 py-xxl-6 rounded-2 my-auto d-flex flex-column align-items-center justify-content-center h-100'>
                <div className="rounded-circle">
                    {category?.category_image &&
                        <Image
                            src={getBaseImageUrl(domain, category?.category_image, "")}
                            width={60} height={60}
                            alt={category?.name}
                            objectFit='contain'
                            className="category-img"
                        />
                    }
                </div>
                <div className="text-area">
                    {category?.name.length > 15 ? (
                        <span className="n17-color fs-five fw-mid f-18">{category.name}</span>
                    ) :
                        <span className="n17-color fs-five fw-mid">{category.name}</span>
                    }
                </div>
            </Link>
            {/* </div> */}
            {/* {show && (
                    <div
                        ref={popoverRef}
                        className="merchants-popover position-absolute start-0 mt-2 bg-white rounded-3 shadow-lg"
                        style={{
                            zIndex: 9999,
                            width: '300px',
                            border: '1px solid #ddd',
                            transform: 'translateY(100%)',
                            bottom: '-8px'
                        }}
                    >
                        <div className="p-3">
                            <h4 className="mb-3 border-bottom n17-color pb-2">Related Merchants</h4>
                            {loading ? (
                                <div className="text-center py-3">
                                    <Spinner animation="border" size="sm" />
                                    <small className="d-block mt-2 text-muted">Loading merchants...</small>
                                </div>
                            ) : dataFetched && merchants.length > 0 ? (
                                <ul className="list-unstyled m-0">
                                    {merchants.slice(0, 5).map((merchant) => (
                                        <li key={merchant.unique_id} className="mb-2">
                                            <Link
                                                href={getMerchantHref(merchant, merchant_slug, slug_type)}
                                                className="text-decoration-none text-dark d-block p-2 rounded hover:bg-gray-100"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="me-3" style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        border: '1px solid #eee',
                                                        borderRadius: '8px',
                                                        overflow: 'hidden',
                                                        padding: '4px'
                                                    }}>
                                                        <Image
                                                            src={getBaseImageUrl(domain, merchant.merchant_logo, "")}
                                                            alt={merchant.merchant_name}
                                                            width={40}
                                                            height={40}
                                                            className="rounded"
                                                            objectFit="contain"
                                                        />
                                                    </div>
                                                    <span className="fw-medium">{merchant.merchant_name}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                    {merchants.length > 5 && (
                                        <li className="text-center pt-3 mt-2 border-top">
                                            <Link
                                                href={`/${merchant_slug}`}
                                                className="text-decoration-none text-primary fw-medium"
                                            >
                                                View all {merchants.length} merchants
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            ) : !timer ? (
                                <div className="text-center py-3">
                                    <small className="text-muted">Hover to load merchants...</small>
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <Spinner animation="border" size="sm" />
                                    <small className="d-block mt-2 text-muted">Loading merchants...</small>
                                </div>
                            )}
                        </div>
                    </div>
                )} */}
        </div>
    )
}

export default CategoryCards
