"use client";
import Link from "next/link";
import Image from "next/image";
import FeatureCard from "./components/FeatureCard";
import CustomerCard from "./components/CustomerCard";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-20 sm:gap-24 md:gap-32 lg:gap-40 xl:gap-48 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 md:gap-12 lg:gap-16 pt-12 sm:pt-16 md:pt-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="flex flex-col w-full lg:w-5/12 gap-6 md:gap-8 items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                Tap into collective wisdom. Solve anything together
              </h1>
              <p className="text-neutral-600 text-md md:text-lg">
                Join a thriving community where every question finds its answer
                and every answer makes a difference.
              </p>
            </div>
            <Link href="/issues" className="self-center lg:self-start">
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
          <div className="w-full lg:w-6/12 mt-8 lg:mt-0 shadow-lg shadow-neutral-300 ">
            <picture>
              <source
                media="(max-width: 900px)"
                srcSet="/problend-image2.png"
              />

              <Image
                src="/issues-page.jpeg"
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
        <section className="flex flex-col items-center md:gap-30 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="flex gap-10">
            <div className="shadow-lg">
              <Image
                src="/answer-page.jpeg"
                alt="app image preview"
                width={512}
                height={489}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="shadow-lg">
              <Image
                src="/rating-page.jpeg"
                alt="app image preview"
                width={509}
                height={488}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "1rem",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <p className="w-full md:w-3/4 lg:w-2/3 font-medium text-neutral-600 text-md md:text-lg text-center">
            Imagine a space where your challenges become opportunities for
            others to contribute. Our platform fosters a vibrant community of
            problem-solvers. Create an issue and watch as diverse perspectives
            and expert insights converge to help you. And if you have knowledge
            to share, jump in and help others overcome their hurdles!
          </p>
          <ul className="flex flex-wrap justify-center gap-8 md:gap-10 ">
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
        <section className="flex flex-col items-center gap-8 md:gap-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
            See some of our customers reviews!
          </h2>
          <ul className="flex flex-wrap justify-center gap-30 max-sm:gap-16">
            <CustomerCard
              img="/victor-photo.JPG"
              name="Victor Samuel"
              role="Frontend Developer"
              thoughts='"I like to use Problend because i can resolve my daily life issues. In the current time where the IA is taking every corner, I appreciate this space for a more human problem solving."'
            />
            <CustomerCard
              img="/pablo-image.jpeg"
              name="Pablo Jimenez"
              role="Backend Developer"
              thoughts='"see a lot of potential in Problend. We live in a time where everyone faces different kinds of problems, and having a space where real people can share real solutions is powerful."'
            />
          </ul>
        </section>
        <section className="bg-orange-50 flex flex-col items-center gap-6 md:gap-8 py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
              Are you ready to be a part of this fantastic community?
            </h2>
            <p className="text-neutral-600 text-md text-center ">
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
