import React, { useState, useEffect } from 'react';
import { Button, Image, Input } from '@nextui-org/react';
import NextJsPhoto from '../NextJsImage';
import PhotoAlbum from 'react-photo-album';

interface ButtonUploadProps {
	readonly onChange: (e: any) => void;
	readonly form: any;
}

interface IPhotoPreview {
	src: string;
	width: number;
	height: number;
}
const photoPreviewsDefault = [{ src: '', width: 0, height: 0 }];

const ButtonUpload = ({ onChange, form }: ButtonUploadProps) => {
	const [photo, setPhoto] = React.useState<File[]>([]); // Specify File type for 'photo'
	const [newPhoto, setNewPhoto] = React.useState<File[]>([]); // Specify File type for 'photo'
	const [photoPreviews, setPhotoPreviews] = useState<IPhotoPreview[]>([]); // Specify string type for 'photoPreviews'

	const loadImageFromDataLink = async (dataLink: string) => {
		try {
			// Convert data link to Blob
			const response = await fetch(dataLink);
			const blob = await response.blob();

			// Create a File from Blob
			const file = new File([blob], 'imageFileName', { type: blob.type });

			// Set the File in state
			setPhoto((prevImageFiles: any) => [...prevImageFiles, file]);
			setPhotoPreviews(form.photos.map((photo: IPhotoPreview) => ({ src: photo, width: 4, height: 3 })));

			// Update the form state
			onChange({
				target: { name: 'photos', value: [file] },
			});
		} catch (error) {
			console.error('Error loading image:', error);
		}
	};

	useEffect(() => {
		if (form?.photos && form?.photos.every((image: string) => typeof image === 'string')) {
			//form to File
			form?.photos.forEach((dataLink: string) => {
				loadImageFromDataLink(dataLink);
			});
		}
	}, [form?.photos]);

	console.log(form.photos);
	console.log(photo);
	console.log(photoPreviews);
	const handleMultiplePhoto = (event: any) => {
		const newUploadedPhotos = [...event.target.files];
		setPhoto(newUploadedPhotos);

		const previews: any = [];
		newUploadedPhotos.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				previews.push(reader.result);
				if (previews.length === newUploadedPhotos.length) {
					previews.map((preview: IPhotoPreview) => ({ src: preview, width: 4, height: 3 }));
					setPhotoPreviews(previews.map((preview: IPhotoPreview) => ({ src: preview, width: 4, height: 3 })));
				}
			};
			reader.readAsDataURL(file);
		});
		onChange({ target: { name: 'photos', value: newUploadedPhotos } });
		setPhotoPreviews(previews);
		setNewPhoto([]);
	};

	const handleRemovePhoto = () => {
		const files: any[] | ((prevState: File[]) => File[]) = [];
		setPhoto([]);
		setPhotoPreviews([]);
		setNewPhoto([]);

		onChange({ target: { name: 'photos', value: files } });
	};

	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				{photoPreviews.length == 0 ? (
					<>
						<input
							id='fileSelect'
							type='file'
							multiple
							onChange={handleMultiplePhoto}
							accept='photo/*'
							className='text-sm custom-photo-upload'
							hidden
						/>
						<div className='flex gap-4 items-center text-sm text-chocolate/80'>
							<label htmlFor='fileSelect' className='button-30 font-bold text-sm'>
								Upload
							</label>
						</div>
					</>
				) : (
					<button className='text-sm font-bold button-29' onClick={handleRemovePhoto}>
						Remove
					</button>
				)}
			</div>
			<PhotoAlbum
				layout='rows'
				photos={photoPreviews}
				renderPhoto={NextJsPhoto}
				defaultContainerWidth={400}
				sizes={{ size: 'calc(100vw - 240px)' }}
			/>
			{photoPreviews.length == 0 && <h4 className='font-bold text-center text-default-400'>NO IMAGE UPLOADED</h4>}
		</div>
	);
};

export default ButtonUpload;
