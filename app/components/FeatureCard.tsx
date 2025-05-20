import Image from "next/image";

type FeatureProps = {
  img: string;
  title: string;
  description: string;
};

export default function FeatureCard({ img, title, description }: FeatureProps) {
  return (
    <li className="p-6 flex border w-100 gap-10 items-center">
      <div className="w-50">
        <Image
          src={img}
          alt="create icon"
          width={512}
          height={512}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </li>
  );
}
