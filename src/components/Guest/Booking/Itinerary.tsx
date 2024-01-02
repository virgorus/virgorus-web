import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { DaySchedule } from '@/types/types'; // Adjust the path accordingly

interface ItineraryProps {
	itinerary?: [DaySchedule];
}

export const Itinerary = ({ itinerary }: ItineraryProps) => {
	return (
		<div className='px-5'>
			{itinerary?.map((daySchedule, index) => (
				<div key={index} className='mb-10'>
					<h3 className='text-lg font-semibold mb-5 border-2 border-black rounded-full text-center'>
						{daySchedule.day}
					</h3>
					{daySchedule.itineraries !== undefined && (
						<ol className='space-y-4'>
							{daySchedule.itineraries &&
								daySchedule.itineraries.map((item, DayIndex) => (
									<li key={DayIndex}>
										<div className='flex'>
											<div className='circle'>
												{DayIndex !== 0 && DayIndex !== daySchedule.itineraries!.length - 1 ? (
													<span className='bg-black text-white font-bold rounded-full h-10 w-10 flex items-center justify-center text-lg'>
														{DayIndex}
													</span>
												) : (
													<span className='border-2 border-black text-black font-bold rounded-full h-10 w-10 flex items-center justify-center text-lg'>
														<IoLocationSharp />
													</span>
												)}
											</div>
											<div className='ml-4'>
												<p className='font-semibold'>{item.time}</p>
												<p>{item.activity}</p>
											</div>
										</div>
									</li>
								))}
						</ol>
					)}
				</div>
			))}
		</div>
	);
};
