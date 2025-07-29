import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { SquarePenIcon, LightbulbIcon, StarIcon } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { RotatingText } from "./animate-ui/text/rotating";

const features = [
  {
    title: "Organize",
    description:
      "Keep all your notes neatly structured and easy to find—whether for work, study, or life.",
    icon: StarIcon,
  },
  {
    title: "Capture",
    description:
      "Quickly jot down thoughts, tasks, or ideas as they come to you, anytime, anywhere.",
    icon: SquarePenIcon,
  },
  {
    title: "Recall",
    description:
      "Easily search and revisit your past notes to stay on top of your projects and goals.",
    icon: LightbulbIcon,
  },
];

function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="flex items-center justify-center flex-col max-w-2xl mx-auto my-12 px-4 ">
        <h1 className="text-primary text-6xl sm:text-7xl text-center font-extrabold tracking-wide mb-4 leading-tight">
          Capture Your <RotatingText text={["Ideas", "Tasks", "Notes"]} /> with
          Note Space
        </h1>
        <p className="text-muted-foreground text-lg text-center mb-6">
          Stay organized, focused, and inspired. Note Space helps you jot down
          thoughts, manage tasks, and keep everything in one place—anytime,
          anywhere.
        </p>
        <div className="flex flex-row gap-4">
          {isLoggedIn ? (
            <Button asChild>
              <Link to="/notes">Take Notes</Link>
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Create Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-6 max-w-8xl mx-auto my-16 px-4 flex-col sm:flex-row mt-28">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-sm px-4"
            >
              <Icon className="text-primary mb-2" size={32} />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
