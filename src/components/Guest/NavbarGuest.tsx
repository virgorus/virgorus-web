'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	DropdownSection,
	Link,
	Button,
	Skeleton,
} from '@nextui-org/react';
import Image from 'next/image';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiHomeLine } from "react-icons/ri";
import { MdOutlineTour } from "react-icons/md";
import { TbPlane } from "react-icons/tb";
import { LuContact2 } from "react-icons/lu";
import { fetchPackages } from '@/queries/fetchPackages';
import { contactsData } from '@/utils/data';
import { getContactIcon } from './ContactBar';
import logoImage from '../../../public/virgorus-logo.png'

type Package = {
	id: number;
	name: string;
	type: string;
	location: string;
};

interface PackageSection {
	key: string;
	label: string;
}

function getPackageSections(packages: Package[]): PackageSection[] {
	const packageSections: PackageSection[] = [];

	packages.forEach((ipackage) => {
		const { location } = ipackage;

		const existingPackageSection = packageSections.find((section) => section.label === location);
		if (!existingPackageSection) {
			packageSections.push({ key: location, label: location });
		}
	});

	return packageSections;
}

export default function NavbarGuest() {
	const [packages, setPackages] = useState<Package[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			setPackages(
				packagesData.map((pd: any) => ({
					id: pd.id,
					name: pd.name,
					type: pd.type,
					location: pd.location,
				}))
			);
		}
	}, [packagesLoading, packagesData]);

	const packageSections = getPackageSections(packages);
	const renderDropdownItems = (packages: Package[]) => {
		return packages.map((ipackage) => (
			<DropdownItem
				key={ipackage.id}
				className='text-black'
				description={ipackage.type}
				href={`/tours/${ipackage.location}/${ipackage.id}`}
			>
				<div className='whitespace-normal'>{ipackage.name}</div>
			</DropdownItem>
		));
	};
	const renderEmptyDropdown = (count: number) => {
		const widthOptions = [2, 3, 4, 5]; // Available width options (as fractions of 5)
	  
		return (
		  <div className="w-full flex flex-col gap-2">
			{Array.from({ length: count }, (_, index) => (
			  <Skeleton
				key={index}
				className={`h-5 w-${widthOptions[Math.floor(Math.random() * widthOptions.length)]}/5 rounded-lg`}
			  />
			))}
		  </div>
		);
	  };
	  	
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems = [
		{ text: 'Home', icon: <RiHomeLine /> , link: '/'},
		{ text: 'Packages', icon: <MdOutlineTour />, link: '/tours/all'},
		{ text: 'Destinations', icon: <TbPlane />, link: '/tours' },
		{ text: 'Contact Us', icon: <LuContact2 />, link: '/about' },
	];

	return (
		<Navbar isBlurred isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className='flex md:hidden' justify='start'> 
				<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='absolute md:hidden text-black h-8 w-8' />
				<NavbarBrand className='justify-center'>
					<Link className='cursor-pointer' href='/'>
						<Image
							src={logoImage}
							alt='virgorus-main-logo'
							height={40}
						/>
						<span className='font-bold font-efco text-3xl text-black ml-3'>virgorus</span>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden md:flex' justify='start'>
				<NavbarBrand>
					<Link className='cursor-pointer' href='/'>
						<Image
							src={logoImage}
							alt='virgorus-main-logo'
							height={40}
						/>
						<span className='font-bold font-efco text-3xl text-black ml-3'>virgorus</span>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden md:flex gap-10 font-playfair pl-16' justify='center'>
				<NavbarItem>
					<Dropdown className='rounded-md'>
						<DropdownTrigger>
							<span className='md:text-sm lg:text-lg flex items-center gap-1 text-black cursor-pointer'>
								Packages
								<RiArrowDownSLine />
							</span>
						</DropdownTrigger>
						<DropdownMenu
							items={packageSections.map((section) => ({
								key: section.key,
								label: section.label,
							}))}
							aria-label='Tour Packages'
							className='w-[380px] h-fit max-h-[500px] overflow-auto'
							emptyContent={renderEmptyDropdown(12)}
							itemClasses={{
								base: 'gap-4',
							}}
						>
							{(item: object) => {
								const section: PackageSection = item as PackageSection;
								const packageItems: Package[] = packages.map((ipackage) => ({
									id: ipackage.id,
									name: ipackage.name,
									type: ipackage.type,
									location: ipackage.location,
								}));

								return (
									<DropdownSection title={section.label} showDivider>
										{renderDropdownItems(packageItems.filter((packageItem) => packageItem.location === section.key))}
									</DropdownSection>
								);
							}}
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
				<NavbarItem>
					<Dropdown className='rounded-md'>
						<DropdownTrigger>
							<span className='md:text-sm lg:text-lg flex items-center gap-1 text-black cursor-pointer'>
								Destinations
								<RiArrowDownSLine />
							</span>
						</DropdownTrigger>
						<DropdownMenu
							items={packageSections}
							aria-label='Destinations'
							className='text-black'
							emptyContent={renderEmptyDropdown(4)}
							itemClasses={{
								base: 'gap-4',
							}}
						>
							{(section) => (
								<DropdownItem key={section.key} href={`/tours/${section.label}`}>
									{section.label}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
				<NavbarItem className='hidden lg:flex'>
					<Link href='/about'>
						<span className='md:text-sm lg:text-lg flex items-center gap-1 text-black cursor-pointer'>About Us</span>
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Dropdown className='rounded-md'>
						<DropdownTrigger>
							<span className='md:text-sm lg:text-lg flex items-center gap-1 text-black cursor-pointer'>
								Contact Us
								<RiArrowDownSLine />
							</span>
						</DropdownTrigger>
						<DropdownMenu
							items={contactsData}
							aria-label='Contacts'
							className='text-black'
							emptyContent={renderEmptyDropdown(5)}
							itemClasses={{
								base: 'gap-4',
							}}
						>
							{(contact) => (
								<DropdownItem key={contact.key} href={contact.key === 'facebook' ? `https://www.facebook.com/${contact.value}` : undefined} startContent={getContactIcon(contact.key)}>
									{contact.value}
								</DropdownItem>
							)}
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent className={`hidden md:flex gap-4 pr-5`} justify='end'>
				<NavbarItem>
					<Link href={`/tours/all`}>
						<Button color='primary' className='font-extralight font-poppins md:text-xs lg:text-sm p-6 rounded-md'>
							Book Now
						</Button>
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu className='items-start'>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={index === menuItems.length - 1 ? 'foreground' : 'foreground'}
							className='w-full'
							href={item.link}
							size='lg'
						>
							{item.icon}&nbsp;{item.text}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
