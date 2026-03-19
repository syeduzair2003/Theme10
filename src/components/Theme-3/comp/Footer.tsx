import React from 'react'
import Image from "next/image";
import { CompanyData } from '@/services/dataTypes';
import { apiFooter } from '@/apis/user';
import logoTwo from '@theme1/assets/images/logo/logo-two.png'
import Link from 'next/link';

interface Props {
	c_data: CompanyData,
	companyLogo: string | null,
	mer_slug: string,
	cat_slug: string,
}
const Footer = async ({ c_data, companyLogo, mer_slug, cat_slug }: Props) => {
	const footerData = await apiFooter(c_data?.unique_id);

	return (
		<>
			<footer className="footer wow fadeInUp animated footer-2" data-wow-delay="900ms">
				<div className="container-fluid custom-width">
					<div className="row">
						<div className="col-md-12 col-lg-4">
							<div className="footer-about">
								<Link href={'/'}>
									<Image src={companyLogo ?? logoTwo} alt="Logo" width={150} height={150} />
								</Link>
								<div className="footer-description">
									<p>Enjoy a user-friendly shopping experience with the latest promotions and exclusive coupon codes.
										Our well-structured platform makes it easy to find the best deals across thousands of products—shop smarter, save more!</p>
								</div>
								<div className="wb-social-media">
									{c_data.facebook ?
										<Link href={c_data.facebook} target='_blank' className='fb'><i className="fa fa-facebook-official"></i></Link>
										: null}
									{c_data.twitter ?
										<Link href={c_data.twitter} target='_blank' className='bh'><i className="fa fa-twitter"></i></Link>
										: null}
									{c_data.linkedin ?
										<Link href={c_data.linkedin} target='_blank' className='fb'><i className="fa fa-linkedin-square"></i></Link>
										: null}
									{c_data.pinterest ?
										<Link href={c_data.pinterest} target='_blank' className='gp'><i className="fa-pinterest-p"></i></Link>
										: null}
									{c_data.youtube ?
										<Link href={c_data.youtube} target='_blank' className='yt'><i className="fa fa-youtube-play"></i></Link>
										: null}
								</div>
							</div>
						</div>
						<div className="col-6 col-md-3 col-lg-3 offset-lg-1 footer-nav">
							<h4 className="footer-subtitle active-color">Useful Link</h4>
							<ul className='footer-list'>
								<li><b><Link href="/" className='footer-page-links'> Home </Link></b></li>
								<li><b><Link href={`/${cat_slug}`} className='footer-page-links'> Category </Link></b></li>
								<li><b><Link href={`/${mer_slug}`} className='footer-page-links'> Store </Link></b></li>
							</ul>
						</div>
						<div className="col-12 col-md-12 col-lg-5 offset-lg-2 recent-posts">
							<h4 className="footer-subtitle active-color">Recent Posts</h4>
							{footerData.data != null && footerData.data.length > 0 && footerData.data?.map((post, i) => {
								return (
									<div key={i} className="post-card my-2">
										<Image src={post.featured_image} height={80} width={80} alt='img' />
										<div className="post-content">
											<Link href={post.link} target="_blank">
												<p className="post-text">
													{post.title.replace(/&#[^;]+;/g, '')}
												</p>
											</Link>
											<div className="post-footer">
												<p className="post-date">{post.date}</p>
												<Link href={post.link} target="_blank">
													<button className="pill">View</button>
												</Link>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</footer>
			<section className="copyright wow fadeInUp animated copyright-2" data-wow-delay="900ms">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="copyright-text">
								<p className="text-uppercase">© {c_data.company_name}, All rights reserved.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Footer
