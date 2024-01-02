import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel-react';
import { CarouselDot, useDotButton } from './CarouselDot';
import { CarouselPrev, CarouselNext, CarouselPrevAlt, CarouselNextAlt } from './CarouselArrows';
import { CarouselThumb } from './CarouselThumb'
import { IAddPackage, Photo } from '@/types/types';
import { CatalogCard } from '@/components/Guest/CatalogCard';
import Image from 'next/image';
import AutoPlay from 'embla-carousel-autoplay';

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
	plugins?: EmblaPluginType;
	packages?: IAddPackage[];
	photos?: Photo[]
};

type PropType2 = {
	slides: number[];
	options?: EmblaOptionsType;
	plugins?: EmblaPluginType;
	photos: Photo[];
};

const CarouselShowcase: React.FC<PropType> = (props) => {
	const { slides, options, plugins, packages } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	return (
		<div className='carousel'>
			<div className='carousel__viewport' ref={emblaRef}>
				<div className='carousel__container'>
					{slides.map((index) => (
						<div className='carousel__slide_100' key={index}>
							<div className=''>
								{packages && (
								<CatalogCard key={packages[index].id} catPackage={packages[index]} />
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='carousel__dots'>
				{scrollSnaps.map((_, index) => (
					<CarouselDot
						key={index}
						onClick={() => onDotButtonClick(index)}
						className={'carousel__dot'.concat(index === selectedIndex ? ' carousel__dot--selected' : '')}
					/>
				))}
			</div>
		</div>
	);
};

const CarouselList: React.FC<PropType> = (props) => {
  const { slides, options, packages } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const location = packages?.[0]?.location

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <>
	  <div className='flex w-full justify-between align-middle items-center'>
		<div className='flex min-w-fit items-center text-xl font-semibold font-playfair pb-1'>
		{location ? (
			<p>Tours in {location}</p>
			) : (
			<p>Loading packages...</p> // Or a different fallback message
		)}
		</div>
		<span className='w-full bg-black/20 h-[1px] rounded-full mx-4'></span>
		<div className="carousel__buttons">
          <CarouselPrev onClick={scrollPrev} disabled={prevBtnDisabled} />
          <CarouselNext onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
	  </div>
      <div className="carousel">
        <div className="carousel__viewport" ref={emblaRef}>
          <div className="carousel__container">
			{slides.map((index) => (
				<div className='carousel__slide_33' key={index}>
					<div className=''>
						{packages && (
							<CatalogCard key={packages[index].id} catPackage={packages[index]} />
						)}
					</div>
				</div>
			))}
          </div>
        </div>
      </div>

      <div className="carousel__dots">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            key={index}
            onClick={() => scrollTo(index)}
            className={'carousel__dot'.concat(
              index === selectedIndex ? ' carousel__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </>
  )
}

const CarouselImage: React.FC<PropType> = (props) => {
	const { slides, options, plugins, photos } = props
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins)
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
	const [buttonsVisible, setButtonsVisible] = useState(false); // Initialize buttonsVisible with false

    
	const scrollPrev = useCallback(
	  () => emblaApi && emblaApi.scrollPrev(),
	  [emblaApi]
	)
	const scrollNext = useCallback(
	  () => emblaApi && emblaApi.scrollNext(),
	  [emblaApi]
	)
	const scrollTo = useCallback(
	  (index: number) => emblaApi && emblaApi.scrollTo(index),
	  [emblaApi]
	)
  
	const onInit = useCallback((emblaApi: EmblaCarouselType) => {
	  setScrollSnaps(emblaApi.scrollSnapList())
	}, [])
  
	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
	  setSelectedIndex(emblaApi.selectedScrollSnap())
	  setPrevBtnDisabled(!emblaApi.canScrollPrev())
	  setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])
  
	useEffect(() => {
	  if (!emblaApi) return
  
	  onInit(emblaApi)
	  onSelect(emblaApi)
	  emblaApi.on('reInit', onInit)
	  emblaApi.on('reInit', onSelect)
	  emblaApi.on('select', onSelect)
	}, [emblaApi, onInit, onSelect])
  
  
	return (
	  <>
		<div className="carousel_image-nospace">
		  <div className="carousel_image__viewport rounded-none sm:rounded-t-2xl relative" 
		  	  ref={emblaRef}
			  onMouseEnter={() => setButtonsVisible(true)}
			  onMouseLeave={() => setButtonsVisible(false)}
			>
		    <div className="carousel_image__container">
			  {slides.map((index) => (
			    <div className="carousel_image__slide " key={index}>
				  {photos && (
					<img
					  className="carousel_image__slide__img"
					  src={String(photos[index].src)}
					  alt='Image loading...'
					/>
				  )}
			    </div>
			  ))}
		    </div>
			  <div
				className={`absolute inset-0 flex max-w-full items-center justify-center ${
				buttonsVisible ? '' : 'hidden'
				}`}
			  >
			  <div className="carousel__buttons w-full justify-between mx-8">
				<CarouselPrevAlt onClick={scrollPrev} disabled={prevBtnDisabled} />
				<CarouselNextAlt onClick={scrollNext} disabled={nextBtnDisabled} />
			  </div>
			</div>
		  </div> 
		  <div className="carousel__dots">
			{scrollSnaps.map((_, index) => (
			<CarouselDot
				key={index}
				onClick={() => scrollTo(index)}
				className={'carousel__dot'.concat(
				index === selectedIndex ? ' carousel__dot--selected' : ''
				)}
			/>
			))}
		  </div>
	    </div>
	  </>
	)
  }

  const CarouselGallery: React.FC<PropType> = (props) => {
	const { slides, options, plugins, photos } = props
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, plugins)
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
	  containScroll: 'keepSnaps',
	  dragFree: true
	})
  
	const onThumbClick = useCallback(
	  (index: number) => {
		if (!emblaMainApi || !emblaThumbsApi) return
		emblaMainApi.scrollTo(index)
	  },
	  [emblaMainApi, emblaThumbsApi]
	)
  
	const onSelect = useCallback(() => {
	  if (!emblaMainApi || !emblaThumbsApi) return
	  setSelectedIndex(emblaMainApi.selectedScrollSnap())
	  emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex])
  
	useEffect(() => {
	  if (!emblaMainApi) return
	  onSelect()
	  emblaMainApi.on('select', onSelect)
	  emblaMainApi.on('reInit', onSelect)
	}, [emblaMainApi, onSelect])
  
	return (
	  <div className="carousel_image">
		<div className="carousel_image__viewport" ref={emblaMainRef}>
		  <div className="carousel_image__container">
			{slides.map((index) => (
			  <div className="carousel_image__slide" key={index}>
				{photos && (
					<img
					  className="carousel_image__slide__img"
					  src={String(photos[index].src)}
					  alt=''
					/>
				)}
			  </div>
			))}
		  </div>
		</div> 
		{photos && photos.length > 1 && (
			<div className="carousel_image-thumbs">
				<div className="carousel_image-thumbs__viewport" ref={emblaThumbsRef}>
					<div className="carousel_image-thumbs__container">
						{slides.map((index) => (
							<CarouselThumb
								onClick={() => onThumbClick(index)}
								selected={index === selectedIndex}
								index={index}
								imgSrc={String(photos[index].src)}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		)}
	  </div>
	)
  }

export { CarouselShowcase, CarouselList, CarouselImage, CarouselGallery };

