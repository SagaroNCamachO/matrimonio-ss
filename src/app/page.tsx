import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import DressCode from '@/components/DressCode';
import GiftSection from '@/components/GiftSection';
import AdditionalInfo from '@/components/AdditionalInfo';
import Footer from '@/components/Footer';
import { getWeddingData } from '@/lib/weddingInfo';
import ConfirmCTA from '@/components/ConfirmCTA';
import PhotoGallery from '@/components/PhotoGallery';

export default async function Home() {
  const data = await getWeddingData();
  const { weddingInfo } = data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      <Hero weddingInfo={weddingInfo} />
      <InfoSection weddingInfo={weddingInfo} />
      <DressCode dressCode={weddingInfo.dressCode} />
      <GiftSection
        bank={weddingInfo.giftAccount.bank}
        accountNumber={weddingInfo.giftAccount.accountNumber}
        accountHolder={weddingInfo.giftAccount.accountHolder}
        accountType={weddingInfo.giftAccount.accountType}
        accountRut={weddingInfo.giftAccount.accountRut}
        totalReceived={weddingInfo.giftAccount.totalReceived}
        goal={weddingInfo.giftAccount.goal}
        currency={weddingInfo.giftAccount.currency}
      />
      <ConfirmCTA
        couple={weddingInfo.couple}
      />
      <PhotoGallery weddingInfo={weddingInfo} />
      <AdditionalInfo weddingInfo={weddingInfo} />
      <Footer coupleNames={weddingInfo.couple} />
    </main>
  );
}
