import ThemeToggle from "@/components/layout/ToggleButton";

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="">
        <h1>Hello, tenents</h1>
      </div>
      <div className=" fixed bottom-1 right-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
