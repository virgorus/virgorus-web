import { IAddPackage } from '@/types/types';
import { CatalogCard } from '@/components/Guest/CatalogCard';

export const Catalog = ({ packages }: { packages: IAddPackage[] }) => {
	return (
		<>
			{packages.map((catPackage) => (
				<CatalogCard key={catPackage.id} catPackage={catPackage} />
			))}
		</>
	);
};
