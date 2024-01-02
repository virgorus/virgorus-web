import React, { useEffect } from 'react';
import { Button, Input, Spacer, Tooltip } from '@nextui-org/react';
import { IoAddCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import { AiOutlineStop } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { IAddPackage } from '@/types/types';

interface TableInclusionsProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableInclusions({ onChange, form }: TableInclusionsProps) {
	const [isRepeating, setIsRepeating] = React.useState<boolean>(false);
	const [inclusions, setInclusions] = React.useState<string[]>([]);
	const [newInclusions, setNewInclusions] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalInclusionsStates, setOriginalInclusionsStates] = React.useState<string[]>([]);

	useEffect(() => {
		const isRepeating = inclusions.includes(newInclusions);
		setIsRepeating(isRepeating);
	}, [inclusions, newInclusions]);

	useEffect(() => {
		if (form?.inclusions) {
			setInclusions(form.inclusions.filter((inclusion: string) => inclusion));
			setIsEditingStates(Array(form.inclusions.length).fill(false));
			setOriginalInclusionsStates(form.inclusions.filter((inclusion: string) => inclusion));
		}
	}, [form?.inclusions]);

	const addInclusions = () => {
		if (newInclusions && !inclusions.includes(newInclusions)) {
			setInclusions([...inclusions, newInclusions]);
			setIsEditingStates([...isEditingStates, false]);
			setOriginalInclusionsStates([...originalInclusionsStates, newInclusions]);
			onChange({ target: { name: 'inclusions', value: [...inclusions, newInclusions] } });
			setNewInclusions('');
		}
	};

	const removeInclusions = (index: number) => {
		const updatedInclusions = [...inclusions];
		updatedInclusions.splice(index, 1);
		setInclusions(updatedInclusions);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalInclusionsStates = [...originalInclusionsStates];
		updatedOriginalInclusionsStates.splice(index, 1);
		setOriginalInclusionsStates(updatedOriginalInclusionsStates);

		onChange({ target: { name: 'inclusions', value: updatedInclusions } });
	};

	const toggleEdit = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = !isEditingStates[index];
		setIsEditingStates(updatedIsEditingStates);
	};

	const handleCancel = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = false;
		setIsEditingStates(updatedIsEditingStates);
		setNewInclusions('');
	};

	const handleEdit = (index: number) => {
		const updatedInclusions = [...inclusions];
		const newEditedInclusions = newInclusions || updatedInclusions[index];

		// Check if the edited inclusion already exists in the list
		if (updatedInclusions[index] !== newEditedInclusions) {
			updatedInclusions[index] = newEditedInclusions;
			setInclusions(updatedInclusions);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalInclusionsStates = [...originalInclusionsStates];
			updatedOriginalInclusionsStates[index] = newEditedInclusions;
			setOriginalInclusionsStates(updatedOriginalInclusionsStates);

			setNewInclusions('');
			onChange({ target: { name: 'inclusions', value: updatedInclusions } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setNewInclusions('');
			setIsEditingStates(updatedIsEditingStates);
		}
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<table aria-label='Rates table' className='max-h-96 overflow-auto'>
				<thead className=' bg-[#f4f4f5]'>
					<tr className='text-xs text-default-600 shadow-sm rounded-lg'>
						<th key='inclusions' className='table-cell w-full items-center text-start p-3 rounded-l-lg'>
							Inclusions
						</th>
						<th key='action' className='table-cell items-center text-end p-3 rounded-r-lg'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{inclusions.map((inclusion, index) => (
						<tr key={`${inclusion}`} className=' space-y-4 text-sm items-center'>
							<td className='table-cell font-medium pt-2 pr-2'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newInclusions}
										onChange={(e) => setNewInclusions(e.target.value)}
										placeholder={originalInclusionsStates[index]}
										className='sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + inclusion
								)}
							</td>
							<td className='justify-center table-cell items-center'>
								{isEditingStates[index] ? (
									<div className='flex justify-center items-center m-auto'>
										<Tooltip isOpen={isRepeating} content='Inclusion already exist!' color='danger' delay={1000}>
											<Button
												onKeyDown={(e) => {
													if (e.key === 'Tab') handleEdit(index);
												}}
												onClick={() => handleEdit(index)}
												disabled={isRepeating}
												isIconOnly
												size='sm'
												className='bg-transparent text-green-700 hover:text-green-600 text-xl hover-bg-transparent'
											>
												<IoCheckmarkCircleOutline />
											</Button>
										</Tooltip>
										<Button
											onClick={() => handleCancel(index)}
											disabled={isRepeating}
											isIconOnly
											size='sm'
											className='bg-transparent text-gray-700 hover:text-gray-600 text-lg hover-bg-transparent'
										>
											<AiOutlineStop />
										</Button>
										<Button
											onClick={() => removeInclusions(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-red-600 hover:text-red-400 text-xl hover-bg-transparent'
										>
											<MdDeleteOutline />
										</Button>
									</div>
								) : (
									<div className='flex justify-center items-center m-auto'>
										<Button
											disabled={isEditingStates.some((isEditing) => isEditing)}
											onClick={() => toggleEdit(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-blue-600 hover:text-blue-400 text-xl hover-bg-transparent'
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
			<div className='flex items-center'>
				<Input
					type='text'
					size='sm'
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newInclusions}
					onChange={(e) => setNewInclusions(e.target.value)}
					placeholder='Add Inclusion'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className='sm:text-sm text-xs mx-0'
				/>

				<Spacer x={4} />
				<Tooltip
					isOpen={isRepeating && !isEditingStates.some((isEditing) => isEditing)}
					content='Inclusion already exist!'
					delay={1000}
					color='danger'
				>
					<Button
						onKeyDown={(e) => {
							if (e.key === 'Tab') addInclusions();
						}}
						onClick={addInclusions}
						size='sm'
						isIconOnly
						className='text-chocolate hover-text-opacity-60 text-2xl bg-transparent transition-all'
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
