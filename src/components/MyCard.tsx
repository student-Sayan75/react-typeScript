interface MyCardProps {
  title: string;
  content: string;
  price: string;
  link: string;
}

function MyCard({ title, content, price, link }: MyCardProps) {
  return (
    <div className="border rounded-xl  shadow flex flex-col items-center overflow-hidden bg-slate-500">
      <img src={link} alt={title} className="w-full h-64 object-cover  mb-4" />
      <h2 className="text-2xl font-bold text-black">{title}</h2>
      <p className="text-black">{content}</p>
      <p className="text-black font-semibold">{price}</p>
      <a
        href={`https://www.apple.com/il/iphone-17-pro/`}
        className="text-blue-500 hover:underline mb-4"
      >
        More Info
      </a>
    </div>
  );
}

export default MyCard;
