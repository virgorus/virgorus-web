import { CatalogCardSuspense } from '@/components/Guest/CatalogCardSuspense';

export const CatalogSuspense = ({ numberOfCards }: { numberOfCards: number }) => {
	const cardsArray = Array.from({ length: numberOfCards });

	return (
		<>
			{cardsArray.map((_, index) => (
				<CatalogCardSuspense key={index} />
			))}
		</>
	);
};
