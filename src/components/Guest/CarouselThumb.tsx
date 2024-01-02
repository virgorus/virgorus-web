import React from 'react'

type PropType = {
  selected: boolean
  imgSrc: string
  index: number
  onClick: () => void
}

export const CarouselThumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props

  return (
    <div
      className={'carousel_image-thumbs__slide'.concat(
        selected ? ' carousel_image-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        className="carousel_image-thumbs__slide__button"
        type="button"
      >
        <img
          className="carousel_image-thumbs__slide__img"
          src={imgSrc}
          alt=""
        />
      </button>
    </div>
  )
}
