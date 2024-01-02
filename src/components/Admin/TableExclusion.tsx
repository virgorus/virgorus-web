import React, { useEffect } from 'react';
import { Button, Input, Spacer, Tooltip } from '@nextui-org/react';
import { IoAddCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import { AiOutlineStop } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import { IAddPackage } from '@/types/types';

interface TableExclusionsProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableExclusions({ onChange, form }: TableExclusionsProps) {
	const [isRepeating, setIsRepeating] = React.useState<boolean>(false);
	const [exclusions, setExclusions] = React.useState<string[]>([]);
	const [newExclusions, setNewExclusions] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalExclusionsStates, setOriginalExclusionsStates] = React.useState<string[]>([]);

	useEffect(() => {
		const isRepeating = exclusions.includes(newExclusions);
		setIsRepeating(isRepeating);
	}, [exclusions, newExclusions]);

	useEffect(() => {
		if (form?.exclusions) {
			setExclusions(form.exclusions.filter((exclusion: string) => exclusion));
			setIsEditingStates(Array(form.exclusions.length).fill(false));
			setOriginalExclusionsStates(form.exclusions.filter((exclusion: string) => exclusion));
		}
	}, [form?.exclusions]);

	const addExclusions = () => {
		if (newExclusions && !exclusions.includes(newExclusions)) {
			setExclusions([...exclusions, newExclusions]);
			setIsEditingStates([...isEditingStates, false]);
			setOriginalExclusionsStates([...originalExclusionsStates, newExclusions]);
			onChange({ target: { name: 'exclusions', value: [...exclusions, newExclusions] } });
			setNewExclusions('');
		}
	};

	const removeExclusions = (index: number) => {
		const updatedExclusions = [...exclusions];
		updatedExclusions.splice(index, 1);
		setExclusions(updatedExclusions);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalExclusionsStates = [...originalExclusionsStates];
		updatedOriginalExclusionsStates.splice(index, 1);
		setOriginalExclusionsStates(updatedOriginalExclusionsStates);

		onChange({ target: { name: 'exclusions', value: updatedExclusions } });
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
		setNewExclusions('');
	};

	const handleEdit = (index: number) => {
		const updatedExclusions = [...exclusions];
		const newEditedExclusions = newExclusions || updatedExclusions[index];

		// Check if the edited exclusion already exists in the list
		if (updatedExclusions[index] !== newEditedExclusions) {
			updatedExclusions[index] = newEditedExclusions;
			setExclusions(updatedExclusions);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalExclusionsStates = [...originalExclusionsStates];
			updatedOriginalExclusionsStates[index] = newEditedExclusions;
			setOriginalExclusionsStates(updatedOriginalExclusionsStates);

			setNewExclusions('');
			onChange({ target: { name: 'exclusions', value: updatedExclusions } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setNewExclusions('');
			setIsEditingStates(updatedIsEditingStates);
		}
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<table aria-label='Rates table' className='max-h-96 overflow-auto'>
				<thead className=' bg-[#f4f4f5]'>
					<tr className='text-xs text-default-600  shadow-sm rounded-lg'>
						<th key='exclusions' className='table-cell w-full items-center text-start p-3 rounded-l-lg'>
							Exclusions
						</th>
						<th key='action' className='table-cell items-center text-end p-3 rounded-r-lg'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{exclusions.map((exclusion, index) => (
						<tr key={`${exclusion}`} className=' space-y-4 text-sm items-center'>
							<td className='table-cell font-medium pt-2 pr-2'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newExclusions}
										onChange={(e) => setNewExclusions(e.target.value)}
										placeholder={originalExclusionsStates[index]}
										className='sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + exclusion
								)}
							</td>
							<td className='justify-center table-cell items-center'>
								{isEditingStates[index] ? (
									<div className='flex justify-center items-center m-auto'>
										<Tooltip isOpen={isRepeating} content='Exclusion already exist!' color='danger' delay={1000}>
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
											onClick={() => removeExclusions(index)}
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
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newExclusions}
					onChange={(e) => setNewExclusions(e.target.value)}
					placeholder='Add Exclusion'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className='sm:text-sm text-xs mx-0'
				/>
				<Spacer x={4} />
				<Tooltip
					isOpen={isRepeating && !isEditingStates.some((isEditing) => isEditing)}
					content='Exclusion already exist!'
					delay={1000}
					color='danger'
				>
					<Button
						onKeyDown={(e) => {
							if (e.key === 'Tab') addExclusions();
						}}
						onClick={addExclusions}
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
