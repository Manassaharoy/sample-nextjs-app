export default function Home() {
  return (
    <div className="text-center">
      <p>Hello from nextjs</p>
      <p>PUBLIC SECRET: {process.env.NEXT_PUBLIC_SECRET}</p>
      <p>SECRET: {process.env.SECRET_KEY}</p>
    </div>
  );
}
