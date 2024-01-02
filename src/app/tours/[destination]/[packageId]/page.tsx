import NavbarGuest from "../../../../components/Guest/NavbarGuest";
import { ContactBar } from "../../../../components/Guest/ContactBar";
import SitemapFooter from "../../../../components/Guest/Footer";
import PackageDetails from "../../../../components/Guest/Booking/PackageDetails";
//import Package from '../../../types/package';

type Package = {
  id: number;
  name: string;
  description: string;
  type: string;
  location: string;
};

const PackagePage = ({ params }: { params: { packageId: number } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black">
      <section className="flex flex-col h-fit items-center mx-6 max-w-7xl w-full">
        <PackageDetails id={params.packageId} />
      </section>
    </main>
  );
};

export default PackagePage;
