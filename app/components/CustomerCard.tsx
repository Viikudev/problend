import Image from "next/image";

type CustomerProps = {
  img: string;
  name: string;
  role: string;
  thoughts: string;
};

export default function CustomerCard({
  img,
  name,
  role,
  thoughts,
}: CustomerProps) {
  return (
    <li>
      <div className="flex gap-4 max-sm:flex-col-reverse">
        <div className="flex flex-col items-center">
          <div className="w-30 h-30 flex">
            <Image
              src={img}
              alt="victor profile photo"
              width={993}
              height={993}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
          <h2 className="font-bold text-amber-500">{name}</h2>
          <p className="text-neutral-600 text-sm">{role}</p>
        </div>
        <div className="w-80 bg-amber-50 text-neutral-600 self-start py-2 px-4 rounded-sm shadow-md">
          <i>{thoughts}</i>
        </div>
      </div>
    </li>
  );
}
