'use client';

import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function SitemapFooter() {
	return (
		<Footer bgDark>
			<div className='w-full bg-nude'>
				<div className='grid max-w-7xl mx-auto grid-cols-2 gap-8 md:px-10 px-6 py-8 md:grid-cols-4 text-chocolate'>
					<div>
						<Footer.Title title='Company' />
						<Footer.LinkGroup col>
							<Footer.Link href='#'>About</Footer.Link>
							<Footer.Link href='#'>Careers</Footer.Link>
							<Footer.Link href='#'>Brand Center</Footer.Link>
							<Footer.Link href='#'>Blog</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<div>
						<Footer.Title title='Help Center' />
						<Footer.LinkGroup col>
							<Footer.Link href='#'>Discord Server</Footer.Link>
							<Footer.Link href='#'>Twitter</Footer.Link>
							<Footer.Link href='#'>Facebook</Footer.Link>
							<Footer.Link href='#'>Contact Us</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<div>
						<Footer.Title title='Legal' />
						<Footer.LinkGroup col>
							<Footer.Link href='#'>Privacy Policy</Footer.Link>
							<Footer.Link href='#'>Licensing</Footer.Link>
							<Footer.Link href='#'>Terms & Conditions</Footer.Link>
						</Footer.LinkGroup>
					</div>
					<div>
						<Footer.Title title='Download' />
						<Footer.LinkGroup col>
							<Footer.Link href='#'>iOS</Footer.Link>
							<Footer.Link href='#'>Android</Footer.Link>
							<Footer.Link href='#'>Windows</Footer.Link>
							<Footer.Link href='#'>MacOS</Footer.Link>
						</Footer.LinkGroup>
					</div>
				</div>
				<div className=' bg-olive py-6'>
					<div className='flex max-w-7xl mx-auto md:px-10 px-6 items-center justify-between'>
						<Footer.Copyright by={'virgorus'} href='/' year={2023} className=' font-efco text-lg' />
						<div className='flex space-x-6 sm:mt-0 justify-center'>
							<Footer.Icon href='#' icon={BsFacebook} />
							<Footer.Icon href='#' icon={BsInstagram} />
							<Footer.Icon href='#' icon={BsTwitter} />
						</div>
					</div>
				</div>
			</div>
		</Footer>
	);
}
