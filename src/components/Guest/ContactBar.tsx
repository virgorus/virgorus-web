import { Button } from '@nextui-org/react';
import { MdPhoneIphone, MdPhoneEnabled, MdEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';
import { contactsData } from '@/utils/data';

/* IF YOU WANT TO CHANGE THE CONTACTS DATA, GO TO utils/data.ts INSTEAD, THEN ADD CORRESPONDING ICON IN THE getContactIcon() FUNCTION */

export function ContactBar() {
	return (
		<div className='backdrop-blur-md bg-chocolate/80 w-full py-2'>
			<div className='flex flex-col sm:flex-row justify-center gap-0 sm:gap-4 lg:gap-10 mx-0 lg:mx-96'>
				{contactsData.map((contact) => (
					<div key={contact.key} className='flex justify-center gap-2 lg:gap-10'>
						<div>
							<Button variant='flat' endContent={getContactIcon(contact.key)} className='text-xs lg:text-sm h-4 sm:h-6'>
								{contact.value}
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function getContactIcon(key: string) {
	switch (key) {
		case 'mobile1':
			return <MdPhoneIphone />;
		case 'mobile2':
			return <MdPhoneIphone />;
		case 'telephone':
			return <MdPhoneEnabled />;
		case 'email':
			return <MdEmail />;
		case 'facebook':
			return <FaFacebook />;
		default:
			return null;
	}
}
