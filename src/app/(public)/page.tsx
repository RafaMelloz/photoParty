import { Header } from "@/components/header";
import { authOptions } from "@/libs/auth";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);


  return (
    <>
      <Header session={session}/>
      
    </>
  );
}
