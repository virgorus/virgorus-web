import React, { useEffect } from 'react';
import { Button, Input, Spacer, Tooltip } from '@nextui-org/react';
import { IoAddCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { PiNotePencilLight } from 'react-icons/pi';
import { AiOutlineStop } from 'react-icons/ai';
import { IAddPackage } from '@/types/types';

interface Pax {
	numberOfPax: string;
	ratePerPax: string;
}

interface TableRatesProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableRates({ onChange, form }: TableRatesProps) {
	const [isRepeating, setIsRepeating] = React.useState<boolean>(false);
	const [paxRate, setPaxRate] = React.useState<Pax[]>([]);
	const [newPax, setNewPax] = React.useState('');
	const [newRate, setNewRate] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalPaxStates, setOriginalPaxStates] = React.useState<string[]>([]);
	const [originalRateStates, setOriginalRateStates] = React.useState<string[]>([]);

	useEffect(() => {
		const isRepeating = paxRate.some((entry) => entry.numberOfPax === newPax && entry.ratePerPax === newRate);
		setIsRepeating(isRepeating);
	}, [newPax, newRate, paxRate]);

	useEffect(() => {
		if (form?.rates) {
			const paxRateData = form.rates
				.filter((item: { numberOfPax: string; ratePerPax: string }) => item.numberOfPax && item.ratePerPax)
				.map((item: { numberOfPax: string; ratePerPax: string }) => ({
					numberOfPax: item.numberOfPax,
					ratePerPax: item.ratePerPax,
				}));
			setPaxRate(paxRateData);
			setIsEditingStates(Array(form.rates.length).fill(false));
			setOriginalPaxStates(paxRateData.map((pax) => pax.numberOfPax).filter((item: string) => item));
			setOriginalRateStates(paxRateData.map((pax) => pax.ratePerPax).filter((item: string) => item));
		}
	}, [form?.rates]);

	const addPax = () => {
		if (newPax && newRate) {
			const existingEntry = paxRate.find((pax) => pax.numberOfPax === newPax);

			if (existingEntry) {
				console.log('Entry already exists');
			} else {
				const newEntry: Pax = {
					numberOfPax: newPax,
					ratePerPax: newRate,
				};
				setPaxRate([...paxRate, newEntry]);
				setIsEditingStates([...isEditingStates, false]);
				setOriginalPaxStates([...originalPaxStates, newPax]);
				setOriginalRateStates([...originalRateStates, newRate]);
				onChange({ target: { name: 'rates', value: [...paxRate, newEntry] } });
				setNewPax('');
				setNewRate('');
			}
		}
	};

	const removePaxRate = (index: number) => {
		const updatedPaxRate = [...paxRate];
		updatedPaxRate.splice(index, 1);
		setPaxRate(updatedPaxRate);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalPaxStates = [...originalPaxStates];
		updatedOriginalPaxStates.splice(index, 1);
		setOriginalPaxStates(updatedOriginalPaxStates);

		const updatedOriginalRateStates = [...originalRateStates];
		updatedOriginalRateStates.splice(index, 1);
		setOriginalRateStates(updatedOriginalRateStates);

		onChange({ target: { name: 'rates', value: updatedPaxRate } });
	};

	const toggleEdit = (index: number) => {
		setNewPax('');
		setNewRate('');
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = !updatedIsEditingStates[index];
		setIsEditingStates(updatedIsEditingStates);
	};

	const handleCancel = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = false;
		setIsEditingStates(updatedIsEditingStates);
		setNewPax('');
		setNewRate('');
	};

	const handleEdit = (index: number) => {
		const updatedPaxRate = [...paxRate];
		const newEditedPax = newPax || updatedPaxRate[index].numberOfPax;
		const newEditedRate = newRate || updatedPaxRate[index].ratePerPax;

		if (updatedPaxRate[index].numberOfPax !== newEditedPax || updatedPaxRate[index].ratePerPax !== newEditedRate) {
			updatedPaxRate[index].numberOfPax = newEditedPax;
			updatedPaxRate[index].ratePerPax = newEditedRate;
			setPaxRate(updatedPaxRate);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalPaxStates = [...originalPaxStates];
			updatedOriginalPaxStates[index] = newEditedPax;
			setOriginalPaxStates(updatedOriginalPaxStates);

			const updatedOriginalRateStates = [...originalRateStates];
			updatedOriginalRateStates[index] = newEditedRate;
			setOriginalRateStates(updatedOriginalRateStates);

			setNewPax('');
			setNewRate('');
			onChange({ target: { name: 'rates', value: updatedPaxRate } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);
			setNewPax('');
			setNewRate('');
		}
	};

	return (
		<div className='flex flex-col w-full gap-4'>
			<table aria-label='Rates table' className='max-h-[48rem] overflow-auto'>
				<thead className=' bg-[#f4f4f5]'>
					<tr className='text-xs text-default-600  shadow-sm rounded-lg'>
						<th key='numberOfPax' className='table-cell w-1/3 items-center text-start p-3 rounded-l-lg'>
							Pax
						</th>
						<th key='ratePerPax' className=' table-cell w-2/3 items-center pl-4'>
							Rate
						</th>
						<th key='action' className='justify-end w-full flex items-center text-end p-3 rounded-r-lg'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{paxRate?.map((paxRateData, index) => (
						<tr
							key={`${paxRateData.numberOfPax}-${paxRateData.ratePerPax}`}
							className=' space-y-4 text-sm items-center'
						>
							<td className='table-cell font-medium pt-2'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newPax}
										onChange={(e) => setNewPax(e.target.value)}
										placeholder={originalPaxStates[index]}
										className=' sm:text-sm text-xs mx-0 '
									/>
								) : (
									'　' + paxRateData.numberOfPax
								)}
							</td>
							<td className='table-cell pt-2 pl-2'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newRate}
										onChange={(e) => setNewRate(e.target.value)}
										placeholder={originalRateStates[index]}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									`₱ ${Number(paxRateData.ratePerPax).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
								)}
							</td>
							<td className='table-cell justify-center items-center'>
								{isEditingStates[index] ? (
									<div className='flex justify-center items-center'>
										<Tooltip isOpen={isRepeating} content='Rate already exist!' color='danger' delay={1000}>
											<Button
												onKeyDown={(e) => {
													if (e.key === 'Tab') handleEdit(index);
												}}
												disabled={isRepeating}
												onClick={() => handleEdit(index)}
												isIconOnly
												type='button'
												size='sm'
												className='bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
											>
												<IoCheckmarkCircleOutline />
											</Button>
										</Tooltip>
										<Button
											disabled={isRepeating}
											onClick={() => handleCancel(index)}
											isIconOnly
											type='button'
											size='sm'
											className='bg-transparent text-gray-700 hover:text-gray-600 text-lg hover:bg-transparent'
										>
											<AiOutlineStop />
										</Button>

										<Button
											onClick={() => removePaxRate(index)}
											isIconOnly
											type='button'
											size='sm'
											className='bg-transparent text-red-600 hover:text-red-400 text-xl hover:bg-transparent'
										>
											<MdDeleteOutline />
										</Button>
									</div>
								) : (
									<div className='flex justify-center items-center m-auto'>
										<Button
											disabled={isEditingStates.some((isEditing) => isEditing)}
											onClick={() => toggleEdit(index)}
											type='button'
											isIconOnly
											size='sm'
											className='bg-transparent text-blue-600 hover:text-blue-400 text-xl hover:bg-transparent'
										>
											<PiNotePencilLight />
										</Button>
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex items-center pb-2'>
				<Input
					type='text'
					size='sm'
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newPax}
					onChange={(e) => setNewPax(e.target.value)}
					placeholder='No. of Pax'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className=' sm:text-sm text-xs mx-0 w-1/3'
				/>
				<Spacer x={2} />
				<Input
					type='text'
					size='sm'
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newRate}
					onChange={(e) => setNewRate(e.target.value)}
					placeholder='Rate/Pax'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className=' sm:text-sm text-xs mx-0 w-2/3'
				/>
				<Spacer x={4} />
				<Tooltip
					isOpen={isRepeating && !isEditingStates.some((isEditing) => isEditing)}
					content='Pax already exist!'
					delay={1000}
					color='danger'
				>
					<Button
						onKeyDown={(e) => {
							if (e.key === 'Tab') addPax();
						}}
						onClick={addPax}
						size='sm'
						isIconOnly
						className='text-chocolate hover:text-opacity-60 text-2xl bg-transparent transition-all'
						disabled={isEditingStates.some((isEditing) => isEditing) || isRepeating}
						type='button'
					>
						<IoAddCircleOutline />
					</Button>
				</Tooltip>
				<Spacer x={4} />
			</div>
		</div>
	);
}
