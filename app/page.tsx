"use client" // This marks the component as a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /about page
    router.push("/about");
  }, [router]);

  return null; // You can show a loading spinner or message if desired
};

export default Home;
