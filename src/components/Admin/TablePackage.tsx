'use client';
import React, { useEffect, useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Pagination,
	Selection,
	SortDescriptor,
	Divider,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	ModalFooter,
} from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import ModalPackage from './ModalPackage';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchPackages } from '@/queries/fetchPackages';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

const INITIAL_VISIBLE_COLUMNS = ['package', 'type', 'location', 'actions'];

type Package = {
	id: number;
	name: string;
	description: string;
	type: string;
	location: string;
};

const columns = [
	{ name: 'ID', uid: 'id' },
	{ name: 'PACKAGE', uid: 'package', sortable: true },
	{ name: 'TYPE', uid: 'type', sortable: true },
	{ name: 'LOCATION', uid: 'location', sortable: true },
	{ name: 'ACTIONS', uid: 'actions' },
];

async function deletePackage(id: any) {
	try {
		const response = await axios.delete(`/api/package/${id}`);
		console.log(response.data);
	} catch (error) {
		console.error('An error occurred while deleting package:', error);
		throw error;
	}
}

export default function TablePackage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [packageId, setPackageId] = useState('');
	const [filterValue, setFilterValue] = React.useState('');
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: 'name',
		direction: 'ascending',
	});
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
					description: pd.description,
					type: pd.type,
					location: pd.location,
				}))
			);
		}
	}, [packagesLoading, packagesData]);

	const handleDeleteModal = React.useCallback(
		(id: any) => {
			setPackageId(id);
			onOpen();
		},
		[setPackageId, onOpen]
	);

	const handleDelete = React.useCallback(() => {
		deletePackage(packageId);
		window.location.reload();
	}, [packageId]);

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredPackages = [...packages];

		if (hasSearchFilter) {
			filteredPackages = filteredPackages.filter((Package) =>
				Package.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return filteredPackages;
	}, [packages, hasSearchFilter, filterValue]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a: Package, b: Package) => {
			const first = a[sortDescriptor.column as keyof Package] as number;
			const second = b[sortDescriptor.column as keyof Package] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === 'descending' ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback(
		(Package: Package, columnKey: React.Key) => {
			const cellValue = Package[columnKey as keyof Package];

			switch (columnKey) {
				case 'package':
					return (
						<div className='flex justify-between w-full rounded-lg'>
							<div className='flex flex-col w-full'>
								<p className='font-bold capitalize flex items-center text-chocolate'>
									{Package.name}
									<span className='text-default-400 rounded px-2 py-1 font-normal flex md:hidden w-fit'>
										- {Package.type}
									</span>
								</p>
								<div className='md:max-w-[400px] w-full gap-2 flex md:hidden'>
									<span>{Package.location}</span>
								</div>
								<Divider className='my-1 flex md:hidden w-full' />
								<p
									className='text-tiny text-default-400 md:max-w-[400px] w-full overflow-hidden'
									style={{
										display: '-webkit-box',
										WebkitLineClamp: 2, // Number of lines before truncating
										WebkitBoxOrient: 'vertical',
										lineHeight: '1rem', // Adjust to control line height
										maxHeight: '2rem', // Maximum height before truncating
									}}
								>
									{Package.description}
								</p>
							</div>
							<div className='flex md:hidden'>
								<Dropdown aria-label='actions'>
									<DropdownTrigger aria-label='action-trigger'>
										<button
											aria-label='action-button'
											className='ml-4 text-2xl outline-none box-shadow-none tap-highlight-transparent'
										>
											<HiDotsVertical />
										</button>
									</DropdownTrigger>
									<DropdownMenu aria-label='action-menu'>
										<DropdownItem
											key='view'
											description='View package as guest'
											startContent={
												<span className='text-xl'>
													<IoMdEye />
												</span>
											}
											aria-label='action-view'
											href={`/tours/${Package.id}`}
										>
											<Link href={`/tours/${Package.location}/${Package.id}`}>View</Link>
										</DropdownItem>
										<DropdownItem
											key='edit'
											showDivider
											description='edit the package'
											startContent={
												<span className='text-xl'>
													<MdEdit />
												</span>
											}
											aria-label='action-edit'
											href={`/admin/packages/${Package.id}`}
										>
											Edit
										</DropdownItem>
										<DropdownItem
											key='delete'
											className='text-danger'
											color='danger'
											description='Permanently delete package'
											startContent={
												<span className='text-xl'>
													<MdDelete />
												</span>
											}
											aria-label='action-delete'
											onClick={() => handleDeleteModal(Package.id)}
										>
											Delete
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>
					);
				case 'type':
					return (
						<div className='md:flex flex-col hidden'>
							<p className='text-small capitalize'>{cellValue}</p>
						</div>
					);
				case 'location':
					return (
						<div className='md:flex flex-col hidden'>
							<p className='text-small capitalize'>{cellValue}</p>
						</div>
					);
				case 'actions':
					return (
						<div className='md:flex hidden relative justify-end items-center gap-2'>
							<Dropdown aria-label='actions'>
								<DropdownTrigger aria-label='action-trigger'>
									<Button isIconOnly size='lg' variant='light' aria-label='action-button'>
										<HiDotsVertical />
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label='action-menu'>
									<DropdownItem
										key='view'
										description='View package as guest'
										startContent={
											<span className='text-xl'>
												<IoMdEye />
											</span>
										}
										aria-label='action-view'
										href={`/tours/${Package.location}/${Package.id}`}
									>
										View
									</DropdownItem>
									<DropdownItem
										key='edit'
										showDivider
										description='Edit to make changes'
										startContent={
											<span className='text-xl'>
												<MdEdit />
											</span>
										}
										aria-label='action-edit'
										href={`/admin/packages/${Package.id}`}
									>
										Edit
									</DropdownItem>
									<DropdownItem
										key='delete'
										className='text-danger'
										color='danger'
										description='Permanently delete package'
										startContent={
											<span className='text-xl'>
												<MdDelete />
											</span>
										}
										aria-label='action-delete'
										onClick={() => handleDeleteModal(Package.id)}
									>
										Delete
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					);
				default:
					return cellValue;
			}
		},
		[handleDeleteModal]
	);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4'>
				<Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className='flex flex-col gap-1'>Delete</ModalHeader>
								<ModalBody>Are you sure?</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='light' onPress={onClose}>
										No
									</Button>
									<Button color='danger' onPress={handleDelete}>
										Yes
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
				<div className='flex justify-between gap-3 items-center'>
					<Input
						aria-label='searchbox'
						size='sm'
						isClearable
						className=' sm:max-w-[44%]'
						placeholder='Search by name...'
						startContent={<FaSearch />}
						value={filterValue}
						variant='bordered'
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<ModalPackage />
				</div>
				<div className='flex justify-between items-center'>
					<span className='text-default-400 text-small'>Total {packages.length} Packages</span>
					<label className='flex items-center text-default-400 text-small'>
						Rows per page:
						<select
							className='bg-transparent outline-none text-default-400 text-small'
							onChange={onRowsPerPageChange}
							aria-label='pagination'
							defaultValue={10}
						>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [isOpen, onOpenChange, filterValue, onSearchChange, packages.length, onRowsPerPageChange, handleDelete, onClear]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-between items-center'>
				<span className='w-[30%] text-small text-default-400'></span>
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					variant='flat'
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className='hidden sm:flex w-[30%] justify-end gap-2'>
					<Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onPreviousPage}>
						Previous
					</Button>
					<Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [page, pages, onPreviousPage, onNextPage]);

	if (packagesLoading) {
		return <div>Loading...</div>;
	}

	if (!packagesData) {
		return <div>Data not available</div>;
	}

	return (
		<Table
			aria-sort='none'
			aria-label='Packages List'
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			className='sm:w-[600px] md:w-full'
			classNames={{
				wrapper: 'max-h-[500px] p-2',
			}}
			selectedKeys={selectedKeys}
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement='outside'
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns} aria-sort='none' aria-label='table-header'>
				{(column) => (
					<TableColumn
						aria-label={column.name}
						aria-sort='none'
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}
						className='md:table-cell hidden'
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>

			<TableBody emptyContent={'No package found'} items={sortedItems} aria-sort='none' aria-label='package-table-body'>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell className={` ${columnKey == 'package' ? '' : 'md:table-cell hidden'}`}>
								{renderCell(item, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
