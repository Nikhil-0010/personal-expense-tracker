"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen bg-gray-50" >
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl" >Personal Finance Tracker</h1>
            <p className="mt-2 text-gray-600" >Track your income and expenses with ease</p>
          </div>
          <Button className="cursor-pointer" onClick={()=>router.push('/transactions')} >Go to Transaction <ArrowRight/> </Button>
        </div>
      </div>
    </>
  );
}
