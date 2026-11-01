function BuyersCard({
  id,
  photo,
  name,
  email,
}: {
  id: number;
  name: string;
  photo: string;
  email: string;
}) {
  return (
    <div className="border rounded-xl shadow flex flex-col items-center overflow-hidden bg-slate-500 p-4">
      <img src={photo} alt={name} className="w-24 h-24 rounded-full mb-4" />
      <h2 className="text-2xl font-bold text-black">{name}</h2>
      <p className="text-black">ID: {id}</p>
      <p className="text-black">{email}</p>
    </div>
  );
}

export default BuyersCard;
