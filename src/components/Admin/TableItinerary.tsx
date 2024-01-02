import React, { useEffect } from 'react';
import { Button, Input, Accordion, AccordionItem, Spacer, Tooltip } from '@nextui-org/react';
import { IoAddCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { PiNotePencilLight } from 'react-icons/pi';
import { AiOutlineStop } from 'react-icons/ai';
import { IAddPackage } from '@/types/types';

interface Itinerary {
	time: string;
	activity: string;
}

interface DaySchedule {
	day: string;
	itineraries: Itinerary[];
}

interface TableItineraryProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableItinerary({ onChange, form }: TableItineraryProps) {
	const [isRepeating, setIsRepeating] = React.useState<boolean>(false);
	const [day, setDay] = React.useState<DaySchedule[]>([]);
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalTimeStates, setOriginalTimeStates] = React.useState<string[]>([]);
	const [originalActivityStates, setOriginalActivityStates] = React.useState<string[]>([]);
	const [newDay, setNewDay] = React.useState('Day 1');
	const [selectedKeys, setSelectedKeys] = React.useState('');
	const [newTime, setNewTime] = React.useState('');
	const [newActivity, setNewActivity] = React.useState('');

	useEffect(() => {
		const isRepeating = day.some(
			(entry) =>
				entry.day === selectedKeys &&
				entry.itineraries.some((itinerary) => itinerary.activity === newActivity && itinerary.time === newTime)
		);

		setIsRepeating(isRepeating);
	}, [selectedKeys, newTime, newActivity, day]);

	useEffect(() => {
		if (form?.itinerary) {
			const updatedItinerary = form.itinerary
				.filter((item) => item.day && item.itineraries)
				.map((item) => ({
					day: item.day,
					itineraries: item.itineraries
						.filter((innerItem) => innerItem.time && innerItem.activity)
						.map((innerItem) => ({
							time: innerItem.time,
							activity: innerItem.activity,
						})),
				}));

			// Assuming you're using some kind of state to store the form
			const newDay = updatedItinerary.length + 1;
			setNewDay('Day ' + newDay);
			setDay(updatedItinerary);
			setIsEditingStates(Array(form.itinerary.length).fill(false));
			setOriginalTimeStates(
				updatedItinerary
					.map((day) => day.itineraries.map((time) => time.time))
					.flat()
					.filter((item: string) => item)
			);
			setOriginalActivityStates(
				updatedItinerary
					.map((day) => day.itineraries.map((time) => time.activity))
					.flat()
					.filter((item: string) => item)
			);
		}
	}, [form?.itinerary]);

	const onSelectKey = () => {
		setIsRepeating(false);
	};

	const addDay = () => {
		if (newDay) {
			const existingEntry = day.find((daySchedule) => daySchedule.day === newDay);

			if (existingEntry) {
				console.log('Entry already exists');
			} else {
				const newDaySchedule: DaySchedule = {
					day: newDay,
					itineraries: [],
				};

				setDay([...day, newDaySchedule]);
				const dayString = 'Day ' + String(Number(newDaySchedule.day.split(' ')[1]) + 1);
				setNewDay(dayString);
				setIsEditingStates([...isEditingStates, false]);
				onChange({ target: { name: 'itinerary', value: [...day, newDaySchedule] } });
			}
		}
	};

	const addItinerary = (dayIndex: number) => {
		if (newTime && newActivity) {
			const existingEntry = day[dayIndex].itineraries.find((itinerary) => itinerary.time === newTime);
			if (existingEntry) {
				setIsRepeating(true);
			} else {
				const newEntry: Itinerary = {
					time: newTime,
					activity: newActivity,
				};

				const updatedDay = [...day];
				updatedDay[+dayIndex].itineraries.push(newEntry);

				setDay(updatedDay);
				setIsEditingStates([...isEditingStates, false]);
				setOriginalTimeStates([...originalTimeStates, newTime]);
				setOriginalActivityStates([...originalActivityStates, newActivity]);
				onChange({ target: { name: 'itinerary', value: updatedDay } });
				setNewTime('');
				setNewActivity('');
			}
		}
	};

	const removeDay = (dayIndex: number) => {
		const updatedDay = [...day];
		updatedDay.splice(dayIndex, 1);
		setNewDay('Day ' + String(Number(updatedDay[updatedDay.length - 1].day.split(' ')[1]) + 1));
		setDay(updatedDay);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(dayIndex, 1);
		setIsEditingStates(updatedIsEditingStates);

		onChange({ target: { name: 'itinerary', value: updatedDay } });
	};

	const toggleEditItinerary = (dayIndex: number, timeIndex: number) => {
		const updateIsEditingStates = [...isEditingStates];
		updateIsEditingStates[timeIndex] = !updateIsEditingStates[timeIndex];
		setIsEditingStates(updateIsEditingStates);
	};

	const handleCancelItinerary = (dayIndex: number, timeIndex: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[timeIndex] = false;
		setIsEditingStates(updatedIsEditingStates);

		setNewTime('');
		setNewActivity('');
	};

	const handleEditItinerary = (dayIndex: number, timeIndex: number) => {
		const updatedDay = [...day];
		const newEditedTime = newTime || updatedDay[dayIndex].itineraries[timeIndex].time;
		const newEditedActivity = newActivity || updatedDay[dayIndex].itineraries[timeIndex].activity;

		if (
			updatedDay[dayIndex].itineraries[timeIndex].time !== newEditedTime ||
			updatedDay[dayIndex].itineraries[timeIndex].activity !== newEditedActivity
		) {
			updatedDay[dayIndex].itineraries[timeIndex].time = newEditedTime;
			updatedDay[dayIndex].itineraries[timeIndex].activity = newEditedActivity;
			setDay(updatedDay);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[timeIndex] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalTimeStates = [...originalTimeStates];
			updatedOriginalTimeStates[timeIndex] = newEditedTime;
			setOriginalTimeStates(updatedOriginalTimeStates);

			const updatedOriginalActivityStates = [...originalActivityStates];
			updatedOriginalActivityStates[timeIndex] = newEditedActivity;
			setOriginalActivityStates(updatedOriginalActivityStates);

			setNewTime('');
			setNewActivity('');
			onChange({ target: { name: 'itinerary', value: updatedDay } });
		} else {
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[timeIndex] = false;
			setIsEditingStates(updatedIsEditingStates);
			setNewTime('');
			setNewActivity('');
		}
	};

	const removeItinerary = (dayIndex: number, timeIndex: number) => {
		const updatedDay = [...day];
		updatedDay[dayIndex].itineraries.splice(timeIndex, 1);
		setDay(updatedDay);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(dayIndex, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalTimeStates = [...originalTimeStates];
		updatedOriginalTimeStates.splice(dayIndex, 1);
		setOriginalTimeStates(updatedOriginalTimeStates);

		const updatedOriginalActivityStates = [...originalActivityStates];
		updatedOriginalActivityStates.splice(dayIndex, 1);
		setOriginalActivityStates(updatedOriginalActivityStates);

		onChange({ target: { name: 'itinerary', value: updatedDay } });
	};

	return (
		<div className='flex flex-col w-full gap-4'>
			<div className={`w-full h-fit ${day.length !== 0 ? 'flex' : 'hidden'}`}>
				<Accordion isCompact variant='bordered' defaultExpandedKeys={['Day 1']} onSelectionChange={() => onSelectKey()}>
					{day.map((daySchedule, dayIndex) => (
						<AccordionItem
							onSelect={() => setSelectedKeys(daySchedule.day)}
							key={`${daySchedule.day}`}
							aria-label={'day' + dayIndex}
							title={
								<div className='flex items-center gap-4'>
									<span className='text-sm h-8 items-center flex font-bold'>{daySchedule.day}</span>
									{day.length - 1 === dayIndex && dayIndex !== 0 && (
										<input
											className='bg-danger rounded-lg p-2 text-sm text-white shadow-sm cursor-pointer hover:bg-opacity-70 hover:shadow-md'
											onClick={() => removeDay(dayIndex)}
											type='button'
											value='Remove'
										/>
									)}
								</div>
							}
							className='text-sm'
						>
							<div className='flex flex-col w-full gap-4 p-2'>
								<table aria-label='Itineraries table' className='max-h-96 overflow-auto'>
									<thead className=' bg-[#f4f4f5]'>
										<tr className='text-xs text-default-600  shadow-sm rounded-lg'>
											<th key='time' className='table-cell w-1/4 items-center text-start p-3 rounded-l-lg'>
												Time
											</th>
											<th key='activity' className=' table-cell w-3/4 items-center pl-4'>
												Activity
											</th>
											<th key='action' className='table-cell w-full items-center text-end p-3 rounded-r-lg'>
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{daySchedule.itineraries.map((itinerary, timeIndex) => (
											<tr key={`${itinerary.time}-${itinerary.activity}`} className='space-y-4 text-sm items-center'>
												<td className='table-cell font-medium pt-2'>
													{isEditingStates[timeIndex] ? (
														<Input
															type='text'
															size='sm'
															value={newTime}
															onChange={(e) => setNewTime(e.target.value)}
															placeholder={originalTimeStates[timeIndex]}
															className=' sm:text-sm text-xs m-0'
														/>
													) : (
														' ' + itinerary.time
													)}
												</td>
												<td className='table-cell pt-2 pl-2'>
													{isEditingStates[timeIndex] ? (
														<Input
															type='text'
															size='sm'
															value={newActivity}
															onChange={(e) => setNewActivity(e.target.value)}
															placeholder={originalActivityStates[timeIndex]}
															className=' sm:text-sm text-xs mx-0 w-full'
														/>
													) : (
														' ' + itinerary.activity
													)}
												</td>
												<td className='table-cell items-center mx-auto'>
													{isEditingStates[timeIndex] ? (
														<div className='flex justify-center items-center mx-auto'>
															<Tooltip
																isOpen={isRepeating}
																content='Itinerary already exist!'
																delay={1000}
																color='danger'
															>
																<Button
																	onKeyDown={(e) => {
																		if (e.key === 'Tab') handleEditItinerary(dayIndex, timeIndex);
																	}}
																	onClick={() => handleEditItinerary(dayIndex, timeIndex)}
																	type='button'
																	isIconOnly
																	size='sm'
																	className='bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
																>
																	<IoCheckmarkCircleOutline />
																</Button>
															</Tooltip>
															<Button
																onClick={() => handleCancelItinerary(dayIndex, timeIndex)}
																isIconOnly
																type='button'
																size='sm'
																className='bg-transparent text-gray-700 hover:text-gray-600 text-lg hover:bg-transparent'
															>
																<AiOutlineStop />
															</Button>
															<Button
																onClick={() => removeItinerary(dayIndex, timeIndex)}
																isIconOnly
																type='button'
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
																onClick={() => toggleEditItinerary(dayIndex, timeIndex)}
																isIconOnly
																type='button'
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

								<div className='flex gap-2 items-center pb-2'>
									<Input
										type='text'
										size='sm'
										value={isEditingStates.some((isEditing) => isEditing) ? '' : newTime}
										onChange={(e) => setNewTime(e.target.value)}
										placeholder='Time'
										disabled={isEditingStates.some((isEditing) => isEditing)}
										className=' sm:text-sm text-xs mx-0 w-1/4'
									/>

									<Input
										type='text'
										size='sm'
										value={isEditingStates.some((isEditing) => isEditing) ? '' : newActivity}
										onChange={(e) => setNewActivity(e.target.value)}
										placeholder='Activity'
										disabled={isEditingStates.some((isEditing) => isEditing)}
										className=' sm:text-sm text-xs mx-0 w-3/4'
									/>
									<Tooltip
										isOpen={isRepeating && !isEditingStates.some((isEditing) => isEditing)}
										content='Itinerary already exist!'
										delay={1000}
										color='danger'
									>
										<Button
											onKeyDown={(e) => e.key === 'Tab' && addItinerary(parseInt(daySchedule.day.split(' ')[1]) - 1)}
											onClick={() => addItinerary(parseInt(daySchedule.day.split(' ')[1]) - 1)}
											size='sm'
											isIconOnly
											className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
											disabled={isEditingStates.some((isEditing) => isEditing)}
											type='button'
										>
											<IoAddCircleOutline />
										</Button>
									</Tooltip>
									<Spacer x={2} />
								</div>
							</div>
						</AccordionItem>
					))}
				</Accordion>
			</div>
			<Button onClick={addDay} size='sm' variant='shadow' color='secondary' type='button'>
				ADD DAY
			</Button>
		</div>
	);
}
