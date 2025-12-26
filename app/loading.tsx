import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-10">
      <Image src="/images/flowva_logo.png" alt="Loading" width={200} height={200} className="animate-pulse-scale" />
    </div>
  );
}
