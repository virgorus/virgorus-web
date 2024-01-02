'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
	Navbar,
	NavbarBrand,
	NavbarMenuToggle,
	NavbarMenuItem,
	NavbarMenu,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	Avatar,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { MdSpaceDashboard, MdPostAdd, MdSettings, MdLogout } from 'react-icons/md';

export default function NavbarAdmin() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const pathname = usePathname();
	const { data: session, status } = useSession();

	const menuItems = ['Dashboard', 'Packages', 'Settings', 'Log Out'];

	return (
		<Navbar isBlurred isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className=' bg-nude shadow-lg'>
			<NavbarContent className='sm:hidden' justify='start'>
				<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
			</NavbarContent>
			<NavbarContent className='sm:hidden pr-3' justify='center'>
				<NavbarBrand>
					<h1 className='font-bold font-efco text-xl'>virgorus</h1>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarBrand>
					<h1 className='font-bold font-efco text-3xl'>virgorus</h1>
				</NavbarBrand>
				<NavbarItem isActive={pathname?.includes('packages') || pathname?.includes('settings') ? false : true}>
					<Link color='foreground' href='/admin' aria-current='page'>
						<span
							className={`flex px-4 py-2 rounded-xl items-center gap-1 font-semibold ${
								pathname?.includes('packages') || pathname?.includes('settings')
									? 'bg-transparent '
									: 'bg-primary text-nude'
							}`}
						>
							<MdSpaceDashboard />
							Dashboard
						</span>
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname?.includes('packages') ? true : false}>
					<Link color='foreground' href='/admin/packages' aria-current='page'>
						<span
							className={`flex px-4 py-2 rounded-xl items-center gap-1 font-semibold ${
								pathname?.includes('packages') ? 'bg-primary text-nude ' : ''
							}`}
						>
							<MdPostAdd />
							Packages
						</span>
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname?.includes('settings') ? true : false}>
					<Link color='foreground' href='/admin/settings' aria-current='page'>
						<span
							className={`flex px-4 py-2 rounded-xl items-center gap-1 font-semibold ${
								pathname?.includes('settings') ? 'bg-chocolate text-nude ' : ''
							}`}
						>
							<MdSettings />
							Settings
						</span>
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent as='div' justify='end'>
				<Dropdown placement='bottom-end'>
					<DropdownTrigger>
						<Avatar
							isBordered
							as='button'
							className='transition-transform'
							color='secondary'
							name='Jason Hughes'
							size='sm'
							src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label='Profile Actions' variant='flat'>
						<DropdownItem key='profile' className='h-14 gap-2'>
							<p className='font-semibold'>Signed in as</p>
							<p className='font-semibold'>{session?.user.email}</p>
						</DropdownItem>
						<DropdownItem key='logout' className='hover:bg-transparent bg-transparent' variant='light'>
							<Button onClick={() => signOut()} variant='shadow'>
								Sign out
							</Button>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className='w-full'
							color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
							href={
								index === 0 ? '/admin' : index === 1 ? '/admin/packages' : index === 2 ? '/admin/settings' : '/admin'
							}
							size='md'
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
