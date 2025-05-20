"use client";
import Link from "next/link";
import Image from "next/image";
import FeatureCard from "./components/FeatureCard";
import CustomerCard from "./components/CustomerCard";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-60">
        <div className="flex flex-wrap justify-center gap-40 pt-40">
          <div className="flex flex-col w-100 gap-10 justify-between items-start">
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl font-semibold">
                Tap into collective wisdom. Solve anything together
              </h1>
              <p className="text-neutral-600 text-md">
                Join a thriving community where every question finds its answer
                and every answer makes a difference.
              </p>
            </div>
            <Link href="/issues">
              <Button
                variant="action"
                size="lg"
                className="text-md items-center"
              >
                Get Started
                <Image
                  src="/arrow-right.svg"
                  alt="arrow icon"
                  width={15}
                  height={15}
                />
              </Button>
            </Link>
          </div>
          <div className="mx-10 w-200 shadow-lg shadow-neutral-300">
            <picture>
              <source
                media="(max-width: 900px)"
                srcSet="/problend-image2.png"
              />

              <Image
                src="/problend-image.png"
                alt="app image preview"
                width={1138}
                height={589}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                }}
              />
            </picture>
          </div>
        </div>
        <section className="flex flex-col items-center gap-20">
          <p className="w-4/5 font-medium">
            Imagine a space where your challenges become opportunities for
            others to contribute. Our platform fosters a vibrant community of
            problem-solvers. Create an issue and watch as diverse perspectives
            and expert insights converge to help you. And if you have knowledge
            to share, jump in and help others overcome their hurdles!
          </p>
          <ul className="flex flex-wrap justify-center gap-10">
            <FeatureCard
              img="/create-image.png"
              title="Create your own issues"
              description="Let the community know your problem, and let them to help you in your daily life"
            />
            <FeatureCard
              img="/answer-image.png"
              title="Answer other people issues"
              description="Be active in the community, helping them with their issues if you can"
            />
            <FeatureCard
              img="/eyes-image.png"
              title="See another people issues and answers"
              description="Look if another people resolved an issue related with yours"
            />
          </ul>
        </section>
        <section className="flex flex-col items-center gap-20">
          <h2 className="font-bold text-xl">
            See some of our customers reviews!
          </h2>
          <ul className="flex flex-wrap justify-center gap-40">
            <CustomerCard
              img="/victor-photo.jpg"
              name="Victor Samuel"
              role="Frontend Developer"
              thoughts='"I like to use Problend because i can resolve my daily life issues. In the current time where the IA is taking every corner, I appreciate this space for a more human problem solving."'
            />
            <CustomerCard
              img="/pablo-image.jpeg"
              name="Pablo Jimenez"
              role="Backend Developer"
              thoughts='"see a lot of potential in Problend. We live in a time where everyone faces different kinds of problems, and having a space where real people can share real solutions is powerful. If the community grows the way I imagine, Problend could become an essential tool for those seeking support beyond automated or generic answers."'
            />
          </ul>
        </section>
        <section className="bg-orange-50 flex flex-col items-center gap-20 py-10">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-bold text-xl">
              Are you ready to be a part of this fantastic community?
            </h2>
            <p className="text-neutral-600 text-sm">
              Collaborate, resolve, and find the answers of your problems with a
              huge community
            </p>
          </div>
          <Link href="/issues">
            <Button variant="action" size="lg" className="text-md items-center">
              Get Started
              <Image
                src="/arrow-right.svg"
                alt="arrow icon"
                width={15}
                height={15}
              />
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
