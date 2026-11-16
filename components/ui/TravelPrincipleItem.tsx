interface TravelPrincipleItemProps {
  number: string;
  title: string;
  text: string;
}

export function TravelPrincipleItem({ number, title, text }: TravelPrincipleItemProps) {
  return <article className="border-t border-glacier-cream/25 py-8"><p className="text-xs font-medium text-warm-gold">{number}</p><h3 className="mt-3 font-editorial text-2xl font-normal">{title}</h3><p className="mt-3 max-w-lg text-sm leading-7 text-glacier-cream/85">{text}</p></article>;
}
