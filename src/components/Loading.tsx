'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const Loading = () => {
	return <Next13ProgressBar height='2px' color='#FF7F5C' options={{ showSpinner: false }} showOnShallow />;
};

export default Loading;
