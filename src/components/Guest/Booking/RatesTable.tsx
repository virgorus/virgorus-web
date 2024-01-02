import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import { Rates } from '@/types/types';

const columns = [
	{
		key: 'numberOfPax',
		label: 'No.',
	},
	{
		key: 'ratePerPax',
		label: 'Rate per pax',
	},
];

interface RatesTableProps {
	rates?: [Rates];
}

export const RatesTable = ({ rates }: RatesTableProps) => {
	return (
		<Table
			aria-label='Rates Table'
			isStriped
			isCompact
			shadow='sm'
			bottomContent={`Contact us for group sizes of ${
				rates?.length !== undefined ? rates?.length + 1 : ''
			} or more people.`}
			className='text-xs font-semibold'
			classNames={{
				base: 'text-xl',
				tfoot: 'text-sm',
			}}
		>
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rates}>
				{(item) => (
					<TableRow>
						{(columnKey) => (
							<TableCell>
								{columnKey === 'ratePerPax'
									? `₱${Number(getKeyValue(item, columnKey)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
									: getKeyValue(item, columnKey)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
