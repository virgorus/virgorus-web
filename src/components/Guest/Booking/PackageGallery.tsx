import React from 'react';
import { Spacer } from '@nextui-org/react';
import NextJsPhoto from '../../NextJsImage';
import PhotoAlbum from 'react-photo-album';

type Photo = {
	src: string;
	width: number;
	height: number;
}

interface PackageGalleryProps {
  photos: Photo[];
}

export const PackageGallery = ({ photos }: PackageGalleryProps) => {
  return (
    <div>
      <PhotoAlbum
        layout='rows'
        photos={photos.length > 0 ? [photos[0]] : []}
        renderPhoto={NextJsPhoto}
        defaultContainerWidth={400}
        sizes={{ size: 'calc(100vw - 240px)' }}
      />
      <Spacer y={4} />
      <PhotoAlbum
        layout='rows'
        photos={photos.length > 1 ? photos.slice(1) : []}
        renderPhoto={NextJsPhoto}
        defaultContainerWidth={400}
        sizes={{ size: 'calc(100vw - 240px)' }}
      />
    </div>
  );
};
